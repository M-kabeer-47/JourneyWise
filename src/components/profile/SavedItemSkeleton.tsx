import React from "react";

interface SavedItemSkeletonProps {
  count?: number;
}

export default function SavedItemSkeleton({ count = 6 }: SavedItemSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse"
        >
          {/* Image skeleton */}
          <div className="aspect-video bg-gray-200"></div>
          
          {/* Content skeleton */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              {/* Type badge skeleton */}
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
              {/* Date skeleton */}
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            
            {/* Title skeleton */}
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-1"></div>
            
            {/* Description skeleton */}
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
