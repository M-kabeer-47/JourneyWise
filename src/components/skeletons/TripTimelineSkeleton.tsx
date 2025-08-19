import React from "react";

export const TripTimelineSkeleton = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="w-80 h-5 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="p-4">
          {/* Timeline skeleton */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mb-2" />
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Progress line skeleton */}
          <div className="w-full h-2 bg-gray-200 rounded animate-pulse mb-8" />

          {/* Cards skeleton */}
        </div>
      </div>
    </div>
  );
};
