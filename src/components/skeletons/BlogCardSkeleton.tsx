"use client";

export function BlogCardSkeleton() {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="relative h-56 bg-gray-200">
        {/* Save Button Skeleton */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full"></div>
        
        {/* Author Badge Skeleton */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 rounded-full px-3 py-1.5">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="mb-4">
          <div className="h-5 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Meta Info Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-12 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-6 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}