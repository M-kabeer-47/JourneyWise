"use client";
import React, { useRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MessageItem from "./MessageItem";
import MessageComposer, { MessageComposerHandle } from "./MesageComposer";
import ChatHeader from "./ChatHeader";
import { ChatMessage } from "@/lib/constants/mock-chat-data";
import { useMessages } from "@/hooks/chat/useMessages";
import { useConnect } from "@/hooks/chat/useConnect";
import { UserPreview } from "@/hooks/chat/useChatUsers";
import { useAppSelector } from "@/hooks/redux";
import useChatUsers from "@/hooks/chat/useChatUsers";
import type { Socket } from "socket.io-client";
import InfiniteScroll from "react-infinite-scroll-component";

interface MessagesAreaProps {
  onBackClick: () => void;
  activeUser: UserPreview | null;

  socket: Socket | null;
}

// Helper to format date separators
const getDateSeparator = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(date);
  messageDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  if (messageDate.getTime() === today.getTime()) {
    return "Today";
  } else if (messageDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
};

export default function MessagesArea({
  onBackClick,
  activeUser,

  socket,
}: MessagesAreaProps) {
  const [replyingTo, setReplyingTo] = useState<ChatMessage | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const composerRef = useRef<MessageComposerHandle>(null);
  const searchParams = useSearchParams();
  const recipientID = searchParams.get("recipientID");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentUser = useAppSelector((state) => state.user);

  // Use React Query for messages with infinite scroll
  const {
    messages,
    sendMessage,
    addSocketMessage,
    updateMessagesStatus,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMessages({
    recipientID,
    socket,
  });

  // Listen for incoming socket messages

  // Handle reply button click
  const handleReply = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      setReplyingTo(message);
    }
  };

  // Scroll to a specific message (when clicking on reply preview)
  const handleScrollToMessage = (messageId: string) => {
    const messageElement = messageRefs.current[messageId];
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
      messageElement.classList.add("highlight-message");
      setTimeout(() => {
        messageElement.classList.remove("highlight-message");
      }, 2000);
    }
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: ChatMessage[] }[] = [];
  messages.forEach((message) => {
    const dateSeparator = getDateSeparator(message.createdAt);
    const existingGroup = groupedMessages.find((g) => g.date === dateSeparator);
    if (existingGroup) {
      existingGroup.messages.push(message);
    } else {
      groupedMessages.push({ date: dateSeparator, messages: [message] });
    }
  });

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data: ChatMessage) => {
      console.log("Socket message received:", data);
      addSocketMessage(data);
    };

    const handleStatusUpdate = (data: { messages: ChatMessage[]; recipientID: string }) => {
      console.log("Status update received:", data);
      updateMessagesStatus(data);
    };

    socket.on("message", handleMessage);
    socket.on("messageStatusUpdated", handleStatusUpdate);
    
    return () => {
      socket.off("message", handleMessage);
      socket.off("messageStatusUpdated", handleStatusUpdate);
    };
  }, [socket, addSocketMessage, updateMessagesStatus]);

  // Track initial load and scroll state
  const hasScrolledToBottomRef = useRef(false);
  const lastMessageIdRef = useRef<string | null>(null);
  const isNearBottomRef = useRef(true); // Track if user is near bottom

  // Track scroll position to know if user is near bottom
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    // Consider "near bottom" if within 100px of bottom
    // Note: with column-reverse, scrollTop is 0 when at bottom
    isNearBottomRef.current = Math.abs(scrollTop) < 100;
  };

  // Scroll to bottom ONLY on initial load
  useEffect(() => {
    if (!isLoading && messages.length > 0 && scrollContainerRef.current && !hasScrolledToBottomRef.current) {
      // Initial scroll to bottom
      scrollContainerRef.current.scrollTop = 0; // With column-reverse, 0 is bottom
      hasScrolledToBottomRef.current = true;
      if (messages.length > 0) {
        lastMessageIdRef.current = messages[messages.length - 1].id;
      }
    }
  }, [recipientID, isLoading]);

  // Reset scroll flag when conversation changes
  useEffect(() => {
    hasScrolledToBottomRef.current = false;
    lastMessageIdRef.current = null;
    isNearBottomRef.current = true;
  }, [recipientID]);

  // Auto-scroll to bottom ONLY when a NEW message is added at the END
  // useEffect(() => {
  //   if (messages.length > 0 && scrollContainerRef.current && hasScrolledToBottomRef.current) {
  //     const lastMessage = messages[messages.length - 1];
      
  //     // Check if there's a NEW message at the end (different ID from last tracked)
  //     if (lastMessage.id !== lastMessageIdRef.current) {
  //       // Only auto-scroll if:
  //       // 1. Last message is from current user (user sent it), OR
  //       // 2. User is already near the bottom (viewing latest messages)
  //       const shouldAutoScroll = 
  //         lastMessage.senderID === currentUser.user?.id || 
  //         isNearBottomRef.current;
          
  //       if (shouldAutoScroll) {
  //         scrollContainerRef.current.scrollTop = 0; // With column-reverse, 0 is bottom
  //       }
        
  //       // Update the last message ID
  //       lastMessageIdRef.current = lastMessage.id;
  //     }
  //   }
  // }, [messages, currentUser]);

  // Convert UserPreview to User type for MessageItem compatibility

  if (!activeUser || !recipientID) {
    return (
      <div className="flex-1 flex items-center justify-center bg-light-gray">
        <p className="text-charcoal font-geist">
          Select a conversation to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="h-[90vh] flex flex-col bg-white">
      {/* Chat Header */}
      <ChatHeader
        activeUser={activeUser}
        onBackClick={onBackClick}
        formatDistanceToNow={() => ""}
      />

      {/* Messages Area */}
      <div 
        id="scrollableDiv"
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 bg-gradient-to-b from-white to-light-gray/30 flex flex-col-reverse"
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          scrollThreshold={1}
          loader={isFetchingNextPage ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-midnight-blue"></div>
            </div>
          ) : null}
          scrollableTarget="scrollableDiv"
          inverse={true}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
        >
          <div ref={messagesEndRef} />
          {groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Date Separator - Shows BEFORE messages in this group */}
              <div className="flex items-center justify-center my-6">
                <div className="px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-200">
                  <span className="text-xs font-medium text-charcoal/60 font-raleway">
                    {group.date}
                  </span>
                </div>
              </div>

              {/* Messages */}
              {group.messages.map((message) => {
                // Determine who sent this message
                const replyToMessage = message.replyTo
                  ? messages.find((m) => m.id === message.replyTo)
                  : undefined;
                return (
                  <MessageItem
                    key={message.id}
                    message={message}
                    recipient={activeUser}
                    replyToMessage={replyToMessage}
                    onReply={handleReply}
                    onScrollToMessage={handleScrollToMessage}
                    ref={(el) => {
                      messageRefs.current[message.id] = el;
                    }}
                  />
                );
              })}
            </div>
          ))}
        </InfiniteScroll>
      </div>

      {/* Message Composer */}
      <div className="bg-white border-t border-gray-200">
        <MessageComposer
          ref={composerRef}
          onSendMessage={sendMessage}
          replyingTo={replyingTo}
          replyingToUser={recipientID}
          onCancelReply={() => setReplyingTo(undefined)}
        />
      </div>
    </div>
  );
}
