import Image from "next/image";
import { User } from "lucide-react";
export default function AuthorCard({
  name,
  image,
  hoverEffect = true,
  size = "md",
  isBlogCard = false,
}: {
  name: string;
  image: string;
  hoverEffect?: boolean;
  size?: "sm" | "md" | "lg";
  isBlogCard?: boolean;
}) {
  return (
    <div
      className={` flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full  py-1.5  ${
        hoverEffect
          ? "px-3 absolute  opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75"
          : ""
      } ${isBlogCard ? "bottom-6 left-4" : "bottom-4 left-4"}`}
    >
      <div
        className={`relative  rounded-full overflow-hidden ${
          size === "sm" ? "w-6 h-6" : size === "md" ? "w-8 h-8" : "w-8 h-8"
        }`}
      >
        {image!=="" ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full  flex items-center bg-gray-200 justify-center rounded-full text-white text-xs font-medium">
            <User className="w-4 h-4 text-gray-500" />
          </div>
        )}
      </div>
      <span
        className={`font-raleway  text-charcoal ${
          hoverEffect
            ? "text-xs font-medium"
            : size === "sm"
            ? "text-xs font-semibold"
            : size === "md"
            ? "text-sm font-semibold"
            : "text-xl font-semibold"
        }`}
      >
        {name}
      </span>
    </div>
  );
}
