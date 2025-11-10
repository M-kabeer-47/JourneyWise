"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ConversationListItem from "./ConversationListItem";
import SearchBar from "../ui/SearchBar";
import { UserPreview } from "@/hooks/chat/useChatUsers";
import type { Socket } from "socket.io-client";

interface ConversationSidebarProps {
  showSidebar: boolean;
  onHideSidebar: () => void;
  onUserSelect: (user: any) => void;
  searchQuery: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  users: UserPreview[];
  socket: Socket;
}

export default function ConversationSidebar({
  showSidebar,
  onHideSidebar,
  onUserSelect,
  searchQuery,
  setSearchQuery,
  users,
  socket,
}: ConversationSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeRecipientId = searchParams.get("recipientID");

  // Fetch users from API

  const handleConversationClick = (userId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let user = users.find((u) => u.id === userId) || null;

    onUserSelect((prevUser:UserPreview) => {
      socket.emit("openChat", {
        userID: userId,
        previousUserID: prevUser ? prevUser.id : null,
      });
      return user;
    });
    params.set("recipientID", userId);
    router.push(`?${params.toString()}`);
    onHideSidebar();
  };

  return (
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
        {users.map((user: UserPreview) => {
          // Create a mock conversation object for compatibility
          const mockConversation = {
            id: `conv-${user.id}`,
            participantId: user.id,
            lastMessage: "",
            lastMessageTime: new Date(),
            unreadCount: 0,
            isOnline: false,
            typingStatus: false,
          };

          // Create a mock user object for compatibility
          const mockUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.image || undefined,
            initials: user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2),
            role:
              user.role === "agent"
                ? ("agent" as const)
                : ("traveler" as const),
            lastSeen: new Date(),
            isOnline: false,
          };

          return (
            <ConversationListItem
              key={user.id}
              conversation={mockConversation}
              user={mockUser}
              isActive={user.id === activeRecipientId}
              onClick={() => handleConversationClick(user.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
