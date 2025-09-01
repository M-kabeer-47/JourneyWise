import React from 'react';

export default function BlogPageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Cover Image Skeleton */}
      <header className="w-full">
        <div className="w-full h-[200px] sm:h-[300px] bg-gray-200"></div>
      </header>

      {/* Article Content Skeleton */}
      <article className="w-full lg:max-w-[1400px] mx-auto px-[30px]">
        <div className="mt-8 sm:mt-12">
          {/* Title Skeleton */}
          <div className="mb-6">
            <div className="h-12 md:h-16 bg-gray-200 rounded mb-2"></div>
            <div className="h-12 md:h-16 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Author Info Skeleton */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="prose prose-lg max-w-none space-y-6">
            {/* Paragraphs */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            ))}

            {/* Image Placeholder */}
            <div className="h-64 bg-gray-200 rounded-lg my-8"></div>

            {/* More Paragraphs */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>

          {/* Tags Skeleton */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="h-5 bg-gray-200 rounded w-16 mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
              ))}
            </div>
          </div>

          {/* Related Posts Skeleton */}
          <div className="mt-16">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
