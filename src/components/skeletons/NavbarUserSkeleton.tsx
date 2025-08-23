import React from "react";

export default function UserMenuSkeleton() {
  return (
    <div className="relative">
      {/* Trigger Button Skeleton */}
      <div className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/10 border border-white/20 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <div className="h-4 w-20 bg-gray-200 rounded hidden md:block" />
        <div className="w-4 h-4 bg-gray-200 rounded" />
      </div>

      {/* Dropdown Skeleton */}
     
    </div>
  );
}
