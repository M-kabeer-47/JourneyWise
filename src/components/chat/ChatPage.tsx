"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import MessageItem from "./MessageItem";
import MessageComposer, { MessageComposerHandle } from "./MesageComposer";
import ConversationListItem from "./ConversationListItem";
import ChatHeader from "./ChatHeader";
import {
  users,
  conversations,
  mockMessages,
  currentUserId,
  ChatMessage,
  User,
} from "@/lib/constants/mock-chat-data";
import { AttachmentFile } from "./AttachmentPreview";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import { Input } from "../ui/Input";
import SearchBar from "../ui/SearchBar";

// Helper function to format time ago
function formatDistanceToNow(
  date: Date,
  options?: { addSuffix?: boolean }
): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  let result = "";
  if (minutes < 1) result = "just now";
  else if (minutes < 60) result = `${minutes} minute${minutes > 1 ? "s" : ""}`;
  else if (hours < 24) result = `${hours} hour${hours > 1 ? "s" : ""}`;
  else if (days < 7) result = `${days} day${days > 1 ? "s" : ""}`;
  else
    result = `${Math.floor(days / 7)} week${
      Math.floor(days / 7) > 1 ? "s" : ""
    }`;

  return options?.addSuffix ? `${result} ago` : result;
}

export default function ChatPage() {
  const [activeConversationId, setActiveConversationId] = useState("conv-1");
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const composerRef = useRef<MessageComposerHandle>(null);

  // Get active conversation details
  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );
  const activeUser = activeConversation
    ? users[activeConversation.participantId]
    : null;

  // Filter conversations by search
  const filteredConversations = conversations.filter((conv) => {
    const user = users[conv.participantId];
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending message
  const handleSendMessage = async (
    content: string,
    replyToId?: string,
    attachments?: AttachmentFile[]
  ) => {
    if (!attachments || attachments.length === 0) {
      // Send message without attachments - show instantly with sending status
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        userId: currentUserId,
        content,
        timestamp: new Date(),
        status: "sending",
        replyTo: replyToId,
      };

      setMessages((prev) => [...prev, newMessage]);
      setReplyingTo(undefined);

      // Simulate message status updates
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
          )
        );
      }, 500);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        );
      }, 1000);
    } else {
      // Handle attachments - show message instantly with upload progress
      const attachmentType = attachments[0].type;
      const messageId = `msg-${Date.now()}`;

      if (attachmentType === "image") {
        // For images, create one message with all images
        const newMessage: ChatMessage = {
          id: messageId,
          userId: currentUserId,
          content: content || "",
          timestamp: new Date(),
          replyTo: replyToId,
          status: "sending",
          isUploading: true,
          attachments: attachments.map((att, index) => ({
            id: `att-${messageId}-${index}`,
            name: att.file.name,
            file: att.file,
            type: "image" as const,
            url: att.preview || "",
            size: att.file.size,
            preview: att.preview,
            isUploading: true,
            uploadProgress: 0,
          })),
        };
        setMessages((prev) => [...prev, newMessage]);
        setReplyingTo(undefined);

        // Upload images with progress tracking
        const uploadedAttachments = await Promise.all(
          attachments.map(async (att: AttachmentFile, index: number) => {
            const uploadedUrl = await uploadToCloudinary({
              file: att.file,
              attachmentType,
              onProgress: (progress) => {
                setMessages((prev) =>
                  prev.map((msg) => {
                    if (msg.id === messageId && msg.attachments) {
                      const updatedAttachments = [...msg.attachments];
                      if (updatedAttachments[index]) {
                        updatedAttachments[index] = {
                          ...updatedAttachments[index],
                          uploadProgress: progress,
                        };
                      }
                      const overallProgress = Math.round(
                        updatedAttachments.reduce(
                          (sum, a) => sum + (a.uploadProgress || 0),
                          0
                        ) / updatedAttachments.length
                      );
                      return {
                        ...msg,
                        attachments: updatedAttachments,
                      };
                    }
                    return msg;
                  })
                );
              },
            });

            return {
              ...att,
              url: uploadedUrl,
            };
          })
        );

        // Update message with uploaded URLs
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === messageId) {
              return {
                ...msg,
                isUploading: false,
                status: "sent",
                attachments: uploadedAttachments.map((att, index) => ({
                  id: `att-${messageId}-${index}`,
                  name: att.file.name,
                  file: att.file,
                  type: "image" as const,
                  url: att.url,
                  size: att.file.size,
                  preview: att.preview,
                  isUploading: false,
                  uploadProgress: 100,
                })),
              };
            }
            return msg;
          })
        );
      } else {
        // For files, send separate messages for each file
        const newMessages: ChatMessage[] = attachments.map((att, index) => ({
          id: `${messageId}-${index}`,
          userId: currentUserId,
          content: index === 0 ? content : "",
          timestamp: new Date(Date.now() + index),
          replyTo: replyToId,
          status: "sending",
          isUploading: true,
          attachments: [
            {
              id: `att-${messageId}-${index}`,
              name: att.file.name,
              file: att.file,
              type: "file" as const,
              url: "",
              size: att.file.size,
              preview: att.preview,
              isUploading: true,
              uploadProgress: 0,
            },
          ],
        }));
        setMessages((prev) => [...prev, ...newMessages]);
        setReplyingTo(undefined);

        // Upload files individually with progress
        await Promise.all(
          attachments.map(async (att: AttachmentFile, index: number) => {
            const msgId = `${messageId}-${index}`;
            const uploadedUrl = await uploadToCloudinary({
              file: att.file,
              attachmentType,
              onProgress: (progress) => {
                setMessages((prev) =>
                  prev.map((msg) => {
                    if (msg.id === msgId && msg.attachments?.[0]) {
                      return {
                        ...msg,
                        attachments: [
                          {
                            ...msg.attachments[0],
                            uploadProgress: progress,
                          },
                        ],
                      };
                    }
                    return msg;
                  })
                );
              },
            });

            // Update message with uploaded URL
            setMessages((prev) =>
              prev.map((msg) => {
                if (msg.id === msgId) {
                  return {
                    ...msg,
                    isUploading: false,
                    status: "sent",
                    attachments: [
                      {
                        id: `att-${msgId}`,
                        name: att.file.name,
                        file: att.file,
                        type: "file" as const,
                        url: uploadedUrl,
                        size: att.file.size,
                        preview: att.preview,
                        isUploading: false,
                        uploadProgress: 100,
                      },
                    ],
                  };
                }
                return msg;
              })
            );
          })
        );
      }
    }
  };

  // Handle reply
  const handleReply = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      setReplyingTo(message);
    }
  };

  // Scroll to message
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

  // Format date separators
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

  // Group messages by date
  const groupedMessages: { date: string; messages: ChatMessage[] }[] = [];
  messages.forEach((message) => {
    const dateSeparator = getDateSeparator(message.timestamp);
    const existingGroup = groupedMessages.find((g) => g.date === dateSeparator);
    if (existingGroup) {
      existingGroup.messages.push(message);
    } else {
      groupedMessages.push({ date: dateSeparator, messages: [message] });
    }
  });

  if (!activeUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-light-gray">
        <p className="text-charcoal font-geist">No conversation selected</p>
      </div>
    );
  }

  return (
    <div className="h-[90vh] flex bg-light-gray font-geist">
      {/* Left Sidebar - Conversations List */}
      <div
        className={`${
          showSidebar ? "flex" : "hidden"
        } md:flex md:w-80 lg:w-96 w-full bg-white border-r border-gray-200 flex-col transition-all duration-300 overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-xl font-bold text-midnight-blue font-raleway mb-3">
            Messages
          </h1>
          {/* Search Bar */}
          <SearchBar
            searchTerm={searchQuery}
            setSearchTerm={setSearchQuery}
            placeholder="Search conversations..."
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-charcoal/60 text-sm">No conversations found</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                user={users[conversation.participantId]}
                isActive={conversation.id === activeConversationId}
                onClick={() => {
                  setActiveConversationId(conversation.id);
                  setShowSidebar(false);
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={`${
          showSidebar ? "hidden md:flex" : "flex"
        } flex-1 flex-col bg-white`}
      >
        {/* Chat Header */}
        <ChatHeader
          activeUser={activeUser}
          onBackClick={() => setShowSidebar(true)}
          formatDistanceToNow={formatDistanceToNow}
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
                const messageUser = users[message.userId];
                const replyToMessage = message.replyTo
                  ? messages.find((m) => m.id === message.replyTo)
                  : undefined;
                const replyToUser = replyToMessage
                  ? users[replyToMessage.userId]
                  : undefined;

                return (
                  <MessageItem
                    key={message.id}
                    message={message}
                    user={messageUser}
                    replyToMessage={replyToMessage}
                    replyToUser={replyToUser}
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
            onSendMessage={handleSendMessage}
            replyingTo={replyingTo}
            replyingToUser={replyingTo ? users[replyingTo.userId] : undefined}
            onCancelReply={() => setReplyingTo(undefined)}
          />
        </div>
      </div>
    </div>
  );
}

// Add this CSS to your global styles for the highlight animation
const styles = `
@keyframes highlight {
  0%, 100% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(0, 119, 182, 0.1);
  }
}

.highlight-message {
  animation: highlight 2s ease-in-out;
}
`;
