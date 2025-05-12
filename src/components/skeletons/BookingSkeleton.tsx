"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function BookingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Personal Details Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 rounded-full" />
          <Skeleton className="h-7 sm:h-8 w-36" />
        </div>
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-5 w-28 mb-2" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Experience Package Section */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        
        {/* Three tier options */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 w-full mb-3" />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Custom tier option */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Skeleton className="h-6 w-6 rounded-full mr-2" />
              <Skeleton className="h-6 w-36" />
            </div>
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      </div>

      {/* Trip Dates Section */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-8 w-28" />
        </div>
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Additional Information Section */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-8 w-52" />
        </div>
        <Skeleton className="h-5 w-48 mb-2" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-gray-100">
        <Skeleton className="h-14 sm:h-16 w-full rounded-lg" />
      </div>
    </div>
  );
}