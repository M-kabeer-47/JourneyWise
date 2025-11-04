interface RepliedMessageProps {
  replyToUser: {
    name: string;
  };
  handleReplyClick: (e: React.MouseEvent) => void;
  isOwnMessage: boolean;
  replyToMessage: {
    content: string;
  };
}
export default function RepliedMessage({
  replyToUser,
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
        className={`text-xs mb-1 font-geist ${
          isOwnMessage ? "text-white/80" : "text-charcoal/60"
        }`}
      >
        <span
          className={`font-medium font-raleway ${
            isOwnMessage ? "text-white" : "text-midnight-blue"
          }`}
        >
          {replyToUser.name}
        </span>
      </div>
      <div
        className={`text-sm line-clamp-2 font-geist ${
          isOwnMessage ? "text-white/90" : "text-charcoal"
        }`}
      >
        {replyToMessage.content}
      </div>
    </button>
  );
}
