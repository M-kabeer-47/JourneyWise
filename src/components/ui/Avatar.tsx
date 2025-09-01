import Image from "next/image";
import { User } from "lucide-react";

export default function Avatar({ profileImage,variant }: { profileImage: string | undefined,variant?: string }) {
  return (
    <div
      className={`h-8 w-8 rounded-full overflow-hidden ${
        variant === "navbar"
          ? "border-2 border-white/20"
          : "border border-gray-200"
      } ${!profileImage && "bg-gray-200 flex items-center justify-center"}`}
    >
      {profileImage ? (
        <Image src={profileImage} alt="User Profile" width={32} height={32} />
      ) : (
        <User size={20} className="text-gray-500" />
      )}
    </div>
  );
}
