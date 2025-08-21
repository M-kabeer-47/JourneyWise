import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ServiceItem from "../ui/ServiceItem";

interface EnhancedServicesListProps {
  title: string;
  services: string[];
  type: "included" | "excluded";
  className?: string;
}

const EnhancedServicesList = ({
  title,
  services,
  type,
  className,
}: EnhancedServicesListProps) => {
  return (
    <div
      className={cn(
        "rounded-xl p-6  transition-all duration-300 hover:shadow-md",
        type === "included"
          ? "bg-gradient-to-br from-midnight-blue/95 to-ocean-blue/95 text-white border border-ocean-blue/20"
          : "bg-light-gray text-gray-800 border border-gray-200",
        className
      )}
    >
      <h3
        className={cn(
          "text-lg font-medium mb-4 pb-2 border-b",
          type === "included"
            ? "text-white border-white/20"
            : "text-gray-700 border-gray-200"
        )}
      >
        {title}
      </h3>
      <div className="space-y-3">
        {services.map((service, index) => (
          <ServiceItem
            index={index}
            key={index}
            type={type}
            service={service}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedServicesList;
