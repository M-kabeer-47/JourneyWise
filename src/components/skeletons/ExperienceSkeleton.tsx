import { Skeleton } from "../ui/skeleton";
export default function ExperienceSkeleton(){
    return (
        <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      

      <div className="max-w-[1450px] mx-auto px-2 sm:px-3 md:px-4 relative -mt-16 relative top-[100px]">
        {/* Header Skeleton */}
        

        <div className="bg-white px-3 sm:px-4 md:px-5 pb-6 shadow-sm rounded-lg">
        <div className="mb-4">
          <Skeleton className="h-10 w-3/4 rounded-lg mb-2 animate-pulse animate-pulse" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
            <Skeleton className="h-4 w-40 rounded-lg animate-pulse" />
          </div>
        </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-4">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-8 space-y-6">
              {/* Main Image Skeleton */}
              <Skeleton className="h-[250px] sm:h-[450px] rounded-xl animate-pulse" />

              {/* Location and Category Skeletons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-32 rounded-xl animate-pulse" />
                <Skeleton className="h-32 rounded-xl animate-pulse" />
              </div>

              {/* Description Skeleton */}
              <Skeleton className="h-40 rounded-xl animate-pulse" />

              {/* Trip Highlights Skeleton */}
              <div>
                <Skeleton className="h-6 w-48 mb-4 animate-pulse" />
                <div className="flex gap-3 overflow-hidden">
                  <Skeleton className="h-32 w-40 shrink-0 rounded-xl animate-pulse" />
                  <Skeleton className="h-32 w-40 shrink-0 rounded-xl animate-pulse" />
                  <Skeleton className="h-32 w-40 shrink-0 rounded-xl animate-pulse" />
                </div>
              </div>

              {/* Requirements Skeleton */}
              <Skeleton className="h-36 rounded-xl animate-pulse" />

              {/* Services Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Skeleton className="h-48 rounded-xl animate-pulse" />
                <Skeleton className="h-48 rounded-xl animate-pulse" />
              </div>
            </div>

            {/* Right Column Skeleton */}
            <div className="lg:col-span-4 hidden lg:block">
              <Skeleton className="h-80 rounded-xl animate-pulse" />
            </div>
          </div>

          {/* Itinerary Skeleton */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <Skeleton className="h-6 w-48 mb-4 animate-pulse" />
            <div className="space-y-4">
              <Skeleton className="h-24 rounded-xl animate-pulse" />
              <Skeleton className="h-24 rounded-xl animate-pulse" />
              <Skeleton className="h-24 rounded-xl animate-pulse" />
            </div>
          </div>

          {/* Reviews Skeleton */}
          <div className="mt-10 pt-6 border-t border-gray-100 mb-[100px]">
            <Skeleton className="h-6 w-48 mb-4 animate-pulse" />
            <div className="space-y-4">
              <Skeleton className="h-32 rounded-xl animate-pulse" />
              <Skeleton className="h-32 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ...existing code...

  // Split requirements into bullet points for check list display
  

    
