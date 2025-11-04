"use client";
import React from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { User } from "@/lib/constants/mock-chat-data";

interface ChatHeaderProps {
  activeUser: User;
  onBackClick: () => void;
  formatDistanceToNow: (date: Date, options?: { addSuffix?: boolean }) => string;
}

export default function ChatHeader({
  activeUser,
  onBackClick,
  formatDistanceToNow,
}: ChatHeaderProps) {
  return (
    <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-white flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        {/* Back button for mobile */}
        <button
          onClick={onBackClick}
          className="md:hidden p-2 hover:bg-light-gray rounded-lg transition-colors flex-shrink-0"
        >
          <ArrowLeft className="h-5 w-5 text-midnight-blue" />
        </button>

        {/* User Info */}
        <div className="relative flex-shrink-0">
          {activeUser.avatar ? (
            <img
              src={activeUser.avatar}
              alt={activeUser.name}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-ocean-blue/20"
            />
          ) : (
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-ocean-blue to-midnight-blue flex items-center justify-center ring-2 ring-ocean-blue/20">
              <span className="text-white font-semibold text-xs sm:text-sm font-raleway">
                {activeUser.initials}
              </span>
            </div>
          )}
          {activeUser.isOnline && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-midnight-blue font-raleway text-sm sm:text-base truncate">
            {activeUser.name}
          </h2>
          <p className="text-xs text-charcoal/60 truncate">
            {activeUser.isOnline ? (
              <span className="text-green-600">Active now</span>
            ) : activeUser.lastSeen ? (
              <span className="hidden sm:inline">
                Active{" "}
                {formatDistanceToNow(activeUser.lastSeen, {
                  addSuffix: true,
                })}
              </span>
            ) : (
              "Offline"
            )}
          </p>
        </div>

        {activeUser.role === "agent" && (
          <span className="hidden lg:inline-block px-3 py-1 rounded-full bg-ocean-blue/10 text-ocean-blue text-xs font-medium font-raleway flex-shrink-0">
            Verified Agent
          </span>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <button className="p-1.5 sm:p-2 hover:bg-light-gray rounded-lg transition-colors">
          <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5 text-charcoal/60" />
        </button>
      </div>
    </div>
  );
}
