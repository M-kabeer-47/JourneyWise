"use client";

export function BookingCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse h-auto sm:h-[300px]">
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image Skeleton */}
        <div className="relative sm:w-[40%] h-48 sm:h-full flex-shrink-0 bg-gray-200">
          {/* Custom Badge Skeleton */}
          <div className="absolute top-1 left-1 w-12 h-5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Content Skeleton */}
        <div className="flex flex-col h-full justify-between p-4 sm:w-[60%]">
          {/* Header */}
          <div className="w-full h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                {/* Title Skeleton */}
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                
                {/* Author Card Skeleton */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>

              {/* Status Badge Skeleton */}
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <div className="w-12 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Tier Name Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>

            {/* Location Skeleton */}
            <div className="flex items-center gap-1 mb-2">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>

            {/* Details Row Skeleton */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                </div>
              </div>
              {/* Price Skeleton */}
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>

          {/* Actions Skeleton */}
          <div className="flex gap-2">
            <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
