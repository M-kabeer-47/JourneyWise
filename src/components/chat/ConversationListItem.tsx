"use client";
import React from "react";
import { User, Conversation } from "@/lib/constants/mock-chat-data";

interface ConversationListItemProps {
  conversation: Conversation;
  user: User;
  isActive: boolean;
  onClick: () => void;
}

// Helper function to format time ago
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString();
}

export default function ConversationListItem({
  conversation,
  user,
  isActive,
  onClick,
}: ConversationListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-start gap-3 hover:bg-ocean-blue/5 transition-all border-l-4 ${
        isActive
          ? "bg-ocean-blue/10 border-ocean-blue"
          : "border-transparent hover:border-ocean-blue/30"
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-blue to-midnight-blue flex items-center justify-center ring-2 ring-white shadow-sm">
            <span className="text-white font-semibold text-sm font-raleway">
              {user.initials}
            </span>
          </div>
        )}
        {/* Online indicator */}
        {conversation.isOnline && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-midnight-blue font-raleway text-sm truncate pr-2">
            {user.name}
          </h3>
          <span className="text-xs text-charcoal/60 font-geist flex-shrink-0">
            {getTimeAgo(conversation.lastMessageTime)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-charcoal/70 font-geist line-clamp-1 flex-1">
            {conversation.typingStatus ? (
              <span className="text-ocean-blue italic">typing...</span>
            ) : (
              conversation.lastMessage
            )}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="bg-ocean-blue text-white text-xs font-semibold font-raleway px-2 py-0.5 rounded-full min-w-[20px] text-center flex-shrink-0">
              {conversation.unreadCount}
            </span>
          )}
        </div>

        {/* Agent badge */}
        {user.role === "agent" && (
          <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-ocean-blue/10 text-ocean-blue font-medium font-geist">
            Travel Agent
          </span>
        )}
      </div>
    </button>
  );
}
