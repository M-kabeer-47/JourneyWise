"use client";
import { motion } from 'framer-motion';

export default function ExperienceCardSkeleton() {
  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg bg-gray-200 animate-pulse">
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="animate-pulse w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      </div>
      
      {/* Content skeleton */}
      <div className="relative h-full flex flex-col justify-end p-5">
        {/* Title & Price */}
        <div className="flex items-start justify-between mb-3 gap-2">
          <div className="h-7 bg-gray-300 rounded-md w-3/4 animate-pulse" />
          <div className="flex flex-col items-end">
            <div className="h-4 bg-gray-300 rounded w-16 mb-1 animate-pulse" />
            <div className="h-7 bg-gray-300 rounded w-20 animate-pulse" />
          </div>
        </div>

        {/* Description */}
        <div className="h-4 bg-gray-300 rounded mb-1 animate-pulse w-full" />
        <div className="h-4 bg-gray-300 rounded mb-3 animate-pulse w-4/5" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-gray-300 rounded-full w-20 animate-pulse" />
          <div className="h-6 bg-gray-300 rounded-full w-14 animate-pulse" />
        </div>

        {/* User Info & Rating */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
            <div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-1 animate-pulse" />
              <div className="flex items-center">
                <div className="h-3 bg-gray-300 rounded w-12 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="h-8 bg-gray-300 rounded-full w-24 animate-pulse" />
        </div>
      </div>
    </div>
  );
}