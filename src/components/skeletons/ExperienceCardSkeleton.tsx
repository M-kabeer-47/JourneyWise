"use client";
import { motion } from 'framer-motion';

interface ExperienceCardSkeletonProps {
  isAgent?: boolean;
}

export default function ExperienceCardSkeleton({ isAgent = false }: ExperienceCardSkeletonProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col animate-pulse">
      {/* Cover Image Section - Fixed Height */}
      <div className="relative h-64 bg-gray-200 flex-shrink-0">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        
        {/* Top Row: Availability Badge & Save Button */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          {/* Availability Badge Skeleton */}
          <div className="h-7 bg-gray-300/80 rounded-full w-24 animate-pulse" />
          
          {/* Save Button Skeleton (only for non-agent) */}
          {!isAgent && (
            <div className="w-10 h-10 bg-gray-300/80 rounded-full animate-pulse" />
          )}
        </div>

        {/* Bottom Left: Author Card Skeleton */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 bg-gray-300/80 rounded-full px-3 py-2 w-32 h-10 animate-pulse" />
        </div>

        {/* Agent Action Buttons Skeleton (only for agent mode) */}
        {isAgent && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="h-9 bg-gray-300/80 rounded-full w-16 animate-pulse" />
            <div className="h-9 bg-gray-300/80 rounded-full w-16 animate-pulse" />
          </div>
        )}
      </div>

      {/* Content Section - Flexible Height */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-full w-14 animate-pulse" />
        </div>

        {/* Title Skeleton */}
        <div className="mb-3">
          <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>

        {/* Description Skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Meta Info Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Duration */}
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            {/* Rating */}
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
          </div>

          {/* Action Button Skeleton */}
          {!isAgent ? (
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
          ) : (
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          )}
        </div>

        {/* Price Row Skeleton - Always at bottom */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}