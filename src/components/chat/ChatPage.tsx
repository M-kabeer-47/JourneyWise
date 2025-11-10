"use client";
import React, { useState } from "react";
import ConversationSidebar from "./ConversationSidebar";
import MessagesArea from "./MessagesArea";
import useChatUsers, { UserPreview } from "@/hooks/chat/useChatUsers";
import { useConnect } from "@/hooks/chat/useConnect";
import { useAppSelector } from "@/hooks/redux";

export default function ChatPage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeUser, setActiveUser] = useState<UserPreview | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { users, isLoading, isError, updateUserStatus } = useChatUsers({
    searchQuery,
  });
  const senderID = useAppSelector((state) => state.user.user?.id || "");

  // Only connect socket after users are loaded
  const { socket } = useConnect({
    userID: senderID,
    updateUserStatus,
    setActiveUser,
    enabled: !isLoading, // Add this to prevent connection before data loads
  });

  if (isLoading) {
    return (
      <div className="h-[90vh] flex items-center justify-center font-geist">
        Loading users...
      </div>
    );
  }
  return (
    <div className="h-[90vh] flex bg-light-gray font-geist">
      {/* Left Sidebar - Conversations List */}
      <ConversationSidebar
        showSidebar={showSidebar}
        onHideSidebar={() => setShowSidebar(false)}
        onUserSelect={setActiveUser}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        users={users}
        socket={socket}
      />

      {/* Main Chat Area */}
      <div
        className={`${
          showSidebar ? "hidden md:flex" : "flex"
        } h-[90vh] flex-1 flex-col bg-white`}
      >
        <MessagesArea
          activeUser={activeUser}
          onBackClick={() => setShowSidebar(true)}
          socket={socket}
        />
      </div>
    </div>
  );
}
