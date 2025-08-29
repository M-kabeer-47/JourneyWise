"use client";

export function BlogCardSkeleton({isPersonal=false}: {isPersonal?: boolean}) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse transform h-[400px]">
      {/* Cover Image Skeleton */}
      <div className="relative h-56 p-3.5">
        <div className="relative w-full h-full bg-gray-200 rounded-lg">
          {/* Save Button Skeleton */}
          
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-5 pb-3">
        {/* Title Skeleton */}
        <div className="mb-2">
          <div className="h-6 bg-gray-200 rounded mb-1"></div>
          
        </div>

        {/* Author Section Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-3 bg-gray-200 rounded"></div>
        </div>

        {/* Excerpt Skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Meta Info and Read More Skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-6 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          {/* Read More Skeleton */}
          <div className="flex items-center gap-1">
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}