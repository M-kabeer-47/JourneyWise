import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/lib/constants/mock-chat-data";
import { MoreHorizontal, Reply, Trash2 } from "lucide-react";
import Dropdown from "../ui/Dropdown";

interface MessageOptionsProps {
  isOwnMessage: boolean;
  onReply: (messageId: string) => void;
  onDelete: (messageId: string) => void; // added prop
  message: ChatMessage;
}

export default function MessageOptions({
  isOwnMessage,
  onReply,
  onDelete,
  message,
}: MessageOptionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div
      className={`flex items-center gap-1 opacity-100 transition-opacity relative mt-1 ${
        isOwnMessage ? "justify-end" : ""
      }`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onReply(message.id);
        }}
        className={`flex items-center gap-1 px-2 py-1 text-xs rounded-lg transition-colors font-geist ${
          isOwnMessage
            ? "text-white/80 hover:text-white hover:bg-white/10"
            : "text-charcoal/60 hover:text-ocean-blue hover:bg-ocean-blue/5"
        }`}
      >
        <Reply className="h-3 w-3" />
        Reply
      </button>

      {isOwnMessage && (
        <div className="relative" ref={dropdownContainerRef}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
            className={`p-1 rounded-lg transition-colors ${
              isOwnMessage
                ? "text-white/80 hover:text-white hover:bg-white/10"
                : "text-charcoal/60 hover:text-ocean-blue hover:bg-ocean-blue/5"
            }`}
          >
            <MoreHorizontal className="h-3 w-3" />
          </button>

          <Dropdown
            size="small"
            items={[
              {
                label: "Delete",
                icon: <Trash2 className="h-3.5 w-3.5" />,
                onClick: () => {
                  onDelete(message.id);
                  setIsDropdownOpen(false);
                },
                destructive: true,
              },
            ]}
            align="end"
            isOpen={isDropdownOpen}
          />
        </div>
      )}
    </div>
  );
}
