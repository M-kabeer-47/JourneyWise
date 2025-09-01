"use client"
import dynamic from "next/dynamic";

const BlogViewer = dynamic(() => import("@/components/blog/BlogViewer"), {
  ssr: false,
  loading: () => (
    <div className="sm:px-12 relative">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
      </div>
    </div>
  ),
});

export default BlogViewer;
