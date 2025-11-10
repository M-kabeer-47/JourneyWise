import { ChatMessage } from "@/lib/constants/mock-chat-data";
import { User } from "@/lib/types/user";
import { UserPreview } from "@/hooks/chat/useChatUsers";

interface MessageHeaderProps {
  user: User | UserPreview;
  message: ChatMessage;
  isOwnMessage: boolean;
}

export default function MessageHeader({
  isOwnMessage,
  message,
  user,
}: MessageHeaderProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "agent":
        return isOwnMessage ? "text-white" : "text-ocean-blue";
      case "admin":
        return isOwnMessage ? "text-white" : "text-accent";
      default:
        return isOwnMessage ? "text-white" : "text-midnight-blue";
    }
  };

  return (
    <div className={`flex items-baseline gap-2 mb-1 ${isOwnMessage ? "" : ""}`}>
      {!isOwnMessage && (
        <span className={`font-semibold text-sm font-raleway ${getRoleColor(user.role)}`}>
          {user.name}
        </span>
      )}
      {user.role === "agent" && (
        <span
          className={`px-2 py-0.5 text-xs rounded-full font-medium font-raleway ${
            isOwnMessage
              ? "bg-white/20 text-white"
              : "bg-ocean-blue/10 text-ocean-blue"
          }`}
        >
          Agent
        </span>
      )}
      {user.role === "admin" && (
        <span
          className={`px-2 py-0.5 text-xs rounded-full font-medium font-raleway ${
            isOwnMessage ? "bg-white/20 text-white" : "bg-accent/10 text-accent"
          }`}
        >
          Admin
        </span>
      )}
      {message.edited && (
        <span
          className={`text-xs font-geist ${
            isOwnMessage ? "text-white/70" : "text-charcoal/50"
          }`}
        >
          (edited)
        </span>
      )}
    </div>
  );
}
