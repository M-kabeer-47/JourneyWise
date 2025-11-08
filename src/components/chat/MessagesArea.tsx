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

interface MessagesAreaProps {
  onBackClick: () => void;
  activeUser: UserPreview | null;
  setActiveUser: React.Dispatch<React.SetStateAction<UserPreview | null>>;
  searchQuery: string;
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
  setActiveUser,
  searchQuery,
}: MessagesAreaProps) {
  const [replyingTo, setReplyingTo] = useState<ChatMessage | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const composerRef = useRef<MessageComposerHandle>(null);
  const senderID = useAppSelector((state) => state.user.user?.id || "");

  const searchParams = useSearchParams();
  const recipientID = searchParams.get("recipientID");
  const { socket } = useConnect({ userID: senderID });
  const { updateUserStatus } = useChatUsers({ searchQuery });
  // Use React Query for messages
  const { messages, sendMessage, addSocketMessage, updateMessagesStatus } =
    useMessages({
      senderID,
      recipientID,
      socket,
    });

  const handleUserOnline = (status: string, userIDsArray: string[]) => {
    alert("User " + JSON.stringify(userIDsArray) + " is now " + status);
    setActiveUser((prevUser) =>
      prevUser && userIDsArray.includes(prevUser.id)
        ? { ...prevUser, status }
        : prevUser
    );
    updateUserStatus(userIDsArray, status);
  };

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

    socket.on("message", (data) => addSocketMessage(data));
    socket.on("onlineUsers", (data) => handleUserOnline("online", data));
    socket.on("messageStatusUpdated", (data) => updateMessagesStatus(data));
    return () => {
      socket.off("message");
      socket.off("onlineUsers");
      socket.off("messageStatusUpdated");
    };
  }, [socket, addSocketMessage]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, recipientID]);

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
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 bg-gradient-to-b from-white to-light-gray/30">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Date Separator */}
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
        <div ref={messagesEndRef} />
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
