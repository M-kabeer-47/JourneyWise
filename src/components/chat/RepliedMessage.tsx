import { ChatMessage } from "@/lib/constants/mock-chat-data";

interface RepliedMessageProps {
  handleReplyClick: (e: React.MouseEvent) => void;
  isOwnMessage: boolean;
  replyToMessage: ChatMessage;
}
export default function RepliedMessage({
  handleReplyClick,
  isOwnMessage,
  replyToMessage,
}: RepliedMessageProps) {
  return (
    <button
      className={`mb-2 p-3 rounded-lg py-2 w-full text-left transition-colors ${
        isOwnMessage
          ? "bg-white/10 border-l-2 border-white/30"
          : "bg-gray-50 border-l-2 border-ocean-blue hover:bg-gray-100"
      }`}
      onClick={handleReplyClick}
    >
      <div
        className={`text-sm line-clamp-2 font-geist ${
          isOwnMessage ? "text-white/90" : "text-charcoal"
        }`}
      >
        {replyToMessage.message}
      </div>
    </button>
  );
}
