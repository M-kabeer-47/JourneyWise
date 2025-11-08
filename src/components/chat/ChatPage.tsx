"use client";
import React, { useState } from "react";
import ConversationSidebar from "./ConversationSidebar";
import MessagesArea from "./MessagesArea";
import useChatUsers, { UserPreview } from "@/hooks/chat/useChatUsers";

export default function ChatPage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeUser, setActiveUser] = useState<UserPreview | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { users, isLoading, isError } = useChatUsers({ searchQuery });

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
          setActiveUser={setActiveUser}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
