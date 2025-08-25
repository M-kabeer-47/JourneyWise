import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export default function ServiceItem({
  type,
  index,
  service,
  size = "md",
  page = "experience"
}: {
  type: "included" | "excluded";
  service: string;
  index: number;
  size?: "sm" | "md" | "lg";
  page?: string;
}) {
  return (
    <div key={index} className="flex items-start gap-3 text-sm sm:text-base">
      <div
        className={cn(
          "flex-shrink-0  rounded-full flex items-center justify-center",
          type === "included" && page === "experience"
            ? "bg-white/20"
            : "bg-gray-200 text-charcoal",
          size === "sm" && "w-4 h-4 text-charcoal",
          size === "md" && "w-5 h-5",
          size === "lg" && "w-6 h-6"
        )}
      >
        {type === "included" ? (
          <Check
            className={`${
              size === "sm" ? "w-3 h-3" : size === "md" ? "w-3 h-3" : "w-4 h-4"
            }`}
          />
        ) : (
          <X
            className={`${
              size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"
            }`}
          />
        )}
      </div>
      <span className={(type === "included" && page === "experience")  ? "text-white/90" : "text-charcoal sm:text-sm text-xs font-medium "}>
        {service}
      </span>
    </div>
  );
}
