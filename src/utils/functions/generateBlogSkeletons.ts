export function generateBlogSkeleton(): string {
  return `
    <article className="max-w-3xl mx-auto  py-[50px]">
      <div className="animate-pulse">
        
        <!-- Blog Title Skeleton -->
        <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-6"></div>

        <!-- Author Info Skeleton -->
        <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/6"></div>
          </div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>

        <div className="w-full max-w-md  my-6">
          <div className="h-64 bg-gray-200 rounded-md"></div>
        </div>

        <!-- Content Skeleton (Paragraphs) -->
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12"></div>
          <div className="h-4 bg-gray-200 rounded w-9/12"></div>
        </div>

        <!-- Image Skeleton -->
        

        <!-- List Skeleton -->
        <div className="space-y-2 mt-6">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-gray-200 rounded-full mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-gray-200 rounded-full mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-gray-200 rounded-full mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

      </div>
    </article>
  `
}
export default generateBlogSkeleton;
