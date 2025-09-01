import React from 'react';

export default function TripPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-midnight-blue to-ocean-blue">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Badge skeleton */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div className="w-4 h-4 bg-white/20 rounded animate-pulse" />
              <div className="w-32 h-4 bg-white/20 rounded animate-pulse" />
            </div>

            {/* Title skeleton */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-48 h-12 bg-white/20 rounded animate-pulse" />
              <div className="w-8 h-8 bg-white/20 rounded animate-pulse" />
              <div className="w-48 h-12 bg-white/20 rounded animate-pulse" />
            </div>

            {/* Description skeleton */}
            <div className="w-96 h-6 bg-white/20 rounded animate-pulse mx-auto mb-8" />

            {/* Stats skeleton */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                  <div className="w-4 h-4 bg-white/20 rounded animate-pulse" />
                  <div className="w-16 h-4 bg-white/20 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline Section Skeleton */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
              
              {/* Timeline Items Skeleton */}
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                      {i < 4 && <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Information Cards Skeleton */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
