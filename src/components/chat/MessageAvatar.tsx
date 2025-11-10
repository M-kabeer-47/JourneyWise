import { User } from "@/lib/types/user";
import { UserPreview } from "@/hooks/chat/useChatUsers";

// Generate initials from name
const getInitials = (name: string): string => {
  const names = name.trim().split(" ");
  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

interface MessageAvatarProps {
  user: User | UserPreview;
  isOwnMessage: boolean;
}

export default function MessageAvatar({
  user,
  isOwnMessage,
}: MessageAvatarProps) {
  const initials = getInitials(user.name);
  
  return (
    <div className="flex-shrink-0">
      {user.image ? (
        <img
          src={user.image}
          alt={user.name}
          className="w-9 h-9 rounded-full object-cover ring-2 ring-ocean-blue/20 shadow-sm"
        />
      ) : (
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center ${
            isOwnMessage 
              ? "bg-white/20" 
              : "bg-gradient-to-br from-ocean-blue to-midnight-blue"
          }`}
        >
          <span
            className={`text-xs font-medium font-raleway ${
              isOwnMessage ? "text-white" : "text-white"
            }`}
          >
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
