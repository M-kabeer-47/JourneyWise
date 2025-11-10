// File: src/components/chat/MessageItem.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store/store";
import { ChatMessage } from "@/lib/constants/mock-chat-data";
import { User } from "@/lib/types/user";
import { UserPreview } from "@/hooks/chat/useChatUsers";
import MessageHeader from "./MessageHeader";
import MessageAvatar from "./MessageAvatar";
import RepliedMessage from "./RepliedMessage";
import MessageAttachments from "./MessageAttachments";
import MessageOptions from "./MessageOptions";
import { Check, CheckCheck, Loader2 } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";

// Format time like WhatsApp (HH:MM AM/PM)
const formatMessageTime = (timestamp: Date | string): string => {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  
  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  
  // Add leading zero to minutes if needed
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${hours}:${minutesStr} ${ampm}`;
};

interface MessageItemProps {
  message: ChatMessage;
  replyToMessage?: ChatMessage;
  recipient: User | UserPreview;
  onReply: (messageId: string) => void;
  onScrollToMessage: (messageId: string) => void;
  ref: React.Ref<HTMLDivElement> | null;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  recipient,
  replyToMessage,
  onReply,
  onScrollToMessage,
  ref,
}) => {
  // Get current user ID from Redux
  const currentUser = useAppSelector((state: RootState) => state.user.user);
  const currentUserId = currentUser?.id || "";

  // Check if this message was sent by the current user
  const isOwnMessage = message.senderID === currentUserId;

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
        <MessageAvatar user={recipient} isOwnMessage={isOwnMessage} />
      )}

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {/* Message Header */}
        <MessageHeader
          user={recipient}
          message={message}
          isOwnMessage={isOwnMessage}
        />

        {/* Reply Context - Fixed click handling */}
        {replyToMessage && (
          <RepliedMessage
            isOwnMessage={isOwnMessage}
            replyToMessage={replyToMessage}
            handleReplyClick={handleReplyClick}
          />
        )}

        {/* Message Text */}
        <div
          className={`text-sm leading-relaxed mb-2 whitespace-pre-wrap font-geist ${
            isOwnMessage ? "text-white" : "text-charcoal"
          }`}
        >
          {message.message}
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
            {formatMessageTime(message.createdAt)}
          </span>

          {/* Status - Only show for own messages */}
          {isOwnMessage && (
            <span className="ml-1">
              {message.status === "sending" || message.isUploading ? (
                <Loader2 className="h-3.5 w-3.5 text-white/70 animate-spin" />
              ) : message.status === "seen" ? (
                <CheckCheck className="h-3.5 w-3.5 text-ocean-blue" />
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
