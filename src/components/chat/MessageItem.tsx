// File: src/components/chat/MessageItem.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  ChatMessage,
  User,
  currentUserId,
} from "@/lib/constants/mock-chat-data";
import MessageHeader from "./MessageHeader";
import MessageAvatar from "./MessageAvatar";
import RepliedMessage from "./RepliedMessage";
import MessageAttachments from "./MessageAttachments";
import MessageOptions from "./MessageOptions";
import { Check, CheckCheck, Loader2 } from "lucide-react";

// import check, checkcheck from tabler-icons-react

interface MessageItemProps {
  message: ChatMessage;
  user: User;
  replyToMessage?: ChatMessage;
  replyToUser?: User;
  onReply: (messageId: string) => void;
  onScrollToMessage: (messageId: string) => void;
  ref: React.Ref<HTMLDivElement> | null;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  user,
  replyToMessage,
  replyToUser,
  onReply,
  onScrollToMessage,
  ref,
}) => {
  const isOwnMessage = message.userId === currentUserId;

  // Format time
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Close emoji picker when clicking outside

  const handleReplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (replyToMessage) {
      onScrollToMessage(replyToMessage.id);
    }
  };

  function handleDelete(messageId: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      className={`group flex gap-3 py-3 px-5 min-h-fit rounded-2xl sm:max-w-2xl max-w-sm mb-4 transition-all duration-200 shadow-sm relative ${
        isOwnMessage 
          ? "bg-midnight-blue ml-auto text-white" 
          : "bg-light-gray border border-gray-200"
      }`}
      ref={ref}
    >
      {/* Avatar */}
      {!isOwnMessage && (
        <MessageAvatar user={user} isOwnMessage={isOwnMessage} />
      )}

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {/* Message Header */}
        <MessageHeader
          user={user}
          message={message}
          isOwnMessage={isOwnMessage}
        />

        {/* Reply Context - Fixed click handling */}
        {replyToMessage && replyToUser && (
          <RepliedMessage
            isOwnMessage={isOwnMessage}
            replyToMessage={replyToMessage}
            replyToUser={replyToUser}
            handleReplyClick={handleReplyClick}
          />
        )}

        {/* Message Text */}
        <div
          className={`text-sm leading-relaxed mb-2 whitespace-pre-wrap font-geist ${
            isOwnMessage ? "text-white" : "text-charcoal"
          }`}
        >
          {message.content}
        </div>

        {/* Attachments */}
        <MessageAttachments message={message} isOwnMessage={isOwnMessage} />

        {/* Time and Seen Status */}
        <div className="flex items-center gap-1 mt-1 justify-end">
          <span
            className={`text-xs font-geist ${
              isOwnMessage ? "text-white/70" : "text-charcoal/50"
            }`}
          >
            {formatTime(message.timestamp)}
          </span>

          {/* Status - Only show for own messages */}
          {isOwnMessage && (
            <span className="ml-1">
              {message.status === "sending" || message.isUploading ? (
                <Loader2 className="h-3.5 w-3.5 text-white/70 animate-spin" />
              ) : message.status === "seen" ? (
                <CheckCheck className="h-3.5 w-3.5 text-white" />
              ) : message.status === "delivered" ? (
                <CheckCheck className="h-3.5 w-3.5 text-white/70" />
              ) : message.status === "sent" ? (
                <Check className="h-3.5 w-3.5 text-white/70" />
              ) : (
                <Loader2 className="h-3.5 w-3.5 text-white/70 animate-spin" />
              )}
            </span>
          )}
        </div>

        {/* Reactions */}

        {/* Message Actions */}
        <MessageOptions
          isOwnMessage={isOwnMessage}
          onReply={onReply}
          message={message}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default MessageItem;
