'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function BookingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Skeleton className="w-24 h-5" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Left side skeleton */}
          <div className="bg-gray-100 p-8 lg:p-12">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            
            <Skeleton className="h-32 w-full rounded-lg mb-8" />
            
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          
          {/* Right side form skeleton */}
          <div className="p-8 lg:p-12">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-5 w-2/3 mb-8" />
            
            {/* Form fields */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-5 w-20 mb-2" />
                <Skeleton className="h-10 w-full" />
                
                <Skeleton className="h-5 w-20 mb-2" />
                <Skeleton className="h-10 w-full" />
                
                <Skeleton className="h-5 w-20 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              
              <div>
                <Skeleton className="h-5 w-32 mb-4" />
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
              
              <div>
                <Skeleton className="h-5 w-32 mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
              
              <div>
                <Skeleton className="h-5 w-32 mb-4" />
                <Skeleton className="h-24 w-full" />
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <Skeleton className="h-36 w-full mb-6" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-5 w-2/3 mx-auto mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}