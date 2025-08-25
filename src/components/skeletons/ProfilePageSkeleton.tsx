"use client";

import { TripCardSkeleton } from "./TripCardSkeleton";
import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { BookingCardSkeleton } from "./BookingCardSkeleton";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { usePathname } from "next/navigation";

// Reusable skeleton components for individual sections
export function TripsSectionSkeleton({ count }: { count?: number }) {
  const { isDesktop } = useIsDesktop();
  const skeletonCount = count || (isDesktop ? 5 : 3);
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <TripCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function BlogsSectionSkeleton({ count,isPersonal }: { count?: number,isPersonal?: boolean }) {
  const { isDesktop } = useIsDesktop();
  const skeletonCount = count || (isDesktop ? 5 : 3);
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <BlogCardSkeleton key={index} isPersonal={isPersonal} />
        ))}
      </div>
    </div>
  );
}

export function BookingsSectionSkeleton({ count }: { count?: number }) {
  const { isDesktop } = useIsDesktop();
  const skeletonCount = count || (isDesktop ? 5 : 3);
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <BookingCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

// Agent Profile Header Skeleton (with banner)
function AgentProfileHeaderSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      {/* Banner Skeleton */}
      <div className="relative h-48 md:h-64 bg-gray-200">
        {/* Profile Image Skeleton */}
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 rounded-full border-4 border-white"></div>
        </div>
        {/* Edit Button Skeleton */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full"></div>
      </div>
      
      {/* Profile Info Skeleton */}
      <div className="pt-16 pb-6 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 bg-gray-200 rounded w-48"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// User Profile Header Skeleton (without banner)
function UserProfileHeaderSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Profile Image Skeleton */}
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full flex-shrink-0"></div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-7 bg-gray-200 rounded w-40"></div>
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="h-9 bg-gray-200 rounded-lg w-20"></div>
          <div className="h-9 bg-gray-200 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
  );
}

// Dynamic Profile Header Skeleton
function ProfileHeaderSkeleton() {
  const pathname = usePathname();
  const isAgentProfile = pathname?.includes('/agent/');
  
  return isAgentProfile ? <AgentProfileHeaderSkeleton /> : <UserProfileHeaderSkeleton />;
}

// Complete Profile Page Skeleton
export default function ProfilePageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Profile Header Skeleton */}
      <ProfileHeaderSkeleton />
      
      {/* Recent Trips Skeleton */}
      <TripsSectionSkeleton />
      
      {/* Recent Blogs Skeleton */}
      <BlogsSectionSkeleton />
      
      {/* Recent Bookings Skeleton */}
      <BookingsSectionSkeleton />
    </div>
  );
}

// Individual Tab Skeletons for full page views
export function TripsTabSkeleton() {
  const { isDesktop } = useIsDesktop();
  const skeletonCount = isDesktop ? 12 : 9;
  
  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
      
      {/* Grid of trip cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <TripCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function BlogsTabSkeleton() {
  const { isDesktop } = useIsDesktop();
  const skeletonCount = isDesktop ? 12 : 9;
  
  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
      
      {/* Grid of blog cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function BookingsTabSkeleton() {
  const { isDesktop } = useIsDesktop();
  const skeletonCount = isDesktop ? 10 : 6;
  
  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
      
      {/* List of booking cards */}
      <div className="space-y-4">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <BookingCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function SavedTabSkeleton() {
  const { isDesktop } = useIsDesktop();
  const skeletonCount = isDesktop ? 12 : 9;
  
  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>
      
      {/* Mixed content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          index % 3 === 0 ? <TripCardSkeleton key={index} /> : 
          index % 3 === 1 ? <BlogCardSkeleton key={index} /> :
          <div key={index} className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
