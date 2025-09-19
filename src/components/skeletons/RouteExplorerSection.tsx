export default function SkeletonRouteExplorer() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Skeleton Trip Cards */}
      <div className="lg:col-span-1 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={`skeleton-card-${i}`}
            className="p-6 rounded-2xl bg-white border border-gray-100 animate-pulse"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-3 w-full">
                <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded-md w-full"></div>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="h-4 bg-gray-100 rounded-md w-1/3"></div>
              <div className="h-4 bg-gray-100 rounded-md w-1/3"></div>
            </div>

            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
              <div className="h-4 bg-gray-100 rounded-md w-1/4"></div>
            </div>
          </div>
        ))}

        {/* Skeleton Create Button */}
        <div className="w-full p-6 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center">
          <div className="h-5 bg-gray-100 rounded-md w-1/2"></div>
        </div>
      </div>

      {/* Skeleton Details Panel */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {/* Skeleton Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-3 w-3/4">
                <div className="h-8 bg-gray-200 rounded-md w-1/2"></div>
                <div className="h-4 bg-gray-100 rounded-md w-full"></div>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
            </div>

            <div className="flex gap-3 mt-4">
              <div className="h-6 bg-gray-100 rounded-full w-[100px]"></div>
              <div className="h-6 bg-gray-100 rounded-full w-[100px]"></div>
              <div className="h-6 bg-gray-100 rounded-full w-[100px]"></div>
            </div>
          </div>

          {/* Skeleton Image */}
          <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200"></div>

          {/* Skeleton Waypoints */}
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded-md w-1/3 mb-6"></div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={`skeleton-waypoint-${i}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex justify-between items-center w-full">
                    <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                    <div className="w-[80px] h-6 bg-gray-100 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skeleton Button */}
            <div className="mt-6">
              <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
