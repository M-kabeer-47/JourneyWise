import {Skeleton} from "@/components/ui/skeleton";
export default function ExperiencePageSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
                {/* Hero Section Skeleton */}
                <div className="relative h-[25vh] md:h-[10vh] bg-midnight-blue/30 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-b from-midnight-blue/20 to-midnight-blue/30"></div>
                </div>
        
                <div className="max-w-[1450px] mx-auto px-2 sm:px-3 md:px-4 relative">
                  {/* Header Section Skeleton */}
                  <div className="mt-6 px-3 sm:px-4 md:px-5">
                    <Skeleton className="h-14 w-3/4 mb-2 rounded-lg" />
                    <div className="flex items-center gap-2 mt-2">
                      <Skeleton className="h-14 w-14 rounded-full" />
                      <div className="flex flex-col">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-24 mt-1" />
        
                      </div>
                     
                    </div>
                  </div>
        
                  <div className="bg-white px-3 sm:px-4 md:px-5 pb-6 shadow-sm rounded-lg mt-4">
                    {/* Main Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
                      {/* Left Column - Main content */}
                      <div className="lg:col-span-8 space-y-6">
                        {/* Main Image Skeleton */}
                        <Skeleton className="h-[250px] sm:h-[450px] mt-6 rounded-xl w-full" />
        
                        {/* Location and Category Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Skeleton className="h-32 rounded-xl" />
                          <Skeleton className="h-32 rounded-xl" />
                        </div>
        
                        {/* Description Skeleton */}
                        <Skeleton className="h-40 w-full rounded-xl" />
        
                        {/* Trip Highlights Skeleton */}
                        <div>
                          <Skeleton className="h-8 w-40 mb-4" />
                          <div className="relative rounded-xl overflow-hidden">
                            {/* Main carousel container */}
                            <div className="relative">
                              {/* Main image skeleton */}
                              <Skeleton className="h-[300px] w-full rounded-xl" />
                              
                              {/* Carousel navigation arrows */}
                              <div className="absolute inset-y-0 left-0 flex items-center">
                                <Skeleton className="h-10 w-10 rounded-full mx-4" />
                              </div>
                              <div className="absolute inset-y-0 right-0 flex items-center">
                                <Skeleton className="h-10 w-10 rounded-full mx-4" />
                              </div>
                              
                              {/* Image counter or pagination indicators */}
                              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                                <Skeleton className="h-2 w-8 rounded-full" />
                                <Skeleton className="h-2 w-2 rounded-full" />
                                <Skeleton className="h-2 w-2 rounded-full" />
                                <Skeleton className="h-2 w-2 rounded-full" />
                              </div>
                            </div>
                            
                            {/* Thumbnail strip */}
                            <div className="flex gap-2 mt-2 overflow-hidden">
                              <Skeleton className="h-20 w-20 flex-shrink-0 rounded-lg" />
                              <Skeleton className="h-20 w-20 flex-shrink-0 rounded-lg" />
                              <Skeleton className="h-20 w-20 flex-shrink-0 rounded-lg" />
                              <Skeleton className="h-20 w-20 flex-shrink-0 rounded-lg" />
                              <Skeleton className="h-20 w-20 flex-shrink-0 rounded-lg" />
                            </div>
                          </div>
                        </div>
        
                        {/* Requirements Skeleton */}
                        <Skeleton className="h-48 w-full rounded-xl" />
        
                        {/* Services Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <Skeleton className="h-48 rounded-xl" />
                          <Skeleton className="h-48 rounded-xl" />
                        </div>
                      </div>
        
                      {/* Right Column - Sticky booking panel */}
                      <div className="lg:col-span-4 hidden lg:block relative top-[35px]">
                        <div className="sticky top-6 space-y-6 flex flex-col gap-2">
                          <Skeleton className="h-[300px] rounded-xl" />
                          <Skeleton className="h-[250px] rounded-xl" />
                        </div>
                      </div>
                    </div>
        
                    {/* Full Width Sections */}
                    <div className="mt-10 pt-6 border-t border-gray-100">
                      <Skeleton className="h-8 w-40 mb-4" />
                      <Skeleton className="h-[300px] w-full rounded-xl" />
                    </div>
        
                    {/* Rating & Reviews Section */}
                    <div className="mt-10 pt-6 border-t border-gray-100 mb-[100px]">
                      <Skeleton className="h-8 w-40 mb-4" />
                      <Skeleton className="h-[200px] w-full rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
    )
}