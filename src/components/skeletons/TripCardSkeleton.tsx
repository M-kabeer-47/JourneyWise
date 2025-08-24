"use client";

export function TripCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="relative h-48 bg-gray-200">
        {/* Action Button Skeleton */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Route Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="flex-1 border-t border-dashed border-gray-300 mx-2" />
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Trip Details Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-14"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-18"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
