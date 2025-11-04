
interface ChatUser {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  isOnline: boolean;
}
interface MessageAvatarProps {
  user: ChatUser;
  isOwnMessage: boolean;
}
export default function MessageAvatar({
  user,
  isOwnMessage,
}: MessageAvatarProps) {
  return (
    <div className="flex-shrink-0">
      {user.avatar ? (
        <img
          src={user.avatar}
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
            {user.initials}
          </span>
        </div>
      )}
      {user.isOnline && (
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white -mt-2.5 ml-6.5 shadow-sm" />
      )}
    </div>
  );
}
