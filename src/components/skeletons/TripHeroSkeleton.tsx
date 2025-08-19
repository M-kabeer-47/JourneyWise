import React from 'react';

export const TripHeroSkeleton = () => {
  return (
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
  );
};