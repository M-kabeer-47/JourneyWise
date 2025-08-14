"use client";
import axios from "axios";

import generateSkeleton from "@/utils/functions/generateBlogSkeletons";
import { useParams, useRouter } from "next/navigation";
import ShareButton from "@/components/ui/ShareButton";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import dynamic from "next/dynamic";
import BlogLoader from "@/components/blog/BlogLoader";

// Dynamically import BlogViewer with SSR disabled
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

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-blog/${id}`
      );
      if (response.data.blog.isPublished === false) {
        router.push("/not-found");
      }
      setBlog(response.data.blog);
      setUser(response.data.user);
    } catch (error) {
      router.push("/not-found");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      {isFetching ? (
        <BlogLoader />
      ) : (
        <>
          {/* Full width cover image - outside article container */}
          {blog?.coverUrl && (
            <header className="w-full">
              <img
                src={blog?.coverUrl || "https://via.placeholder.com/1200x600"}
                alt="Blog Cover"
                className="w-full h-[200px] sm:h-[300px] object-cover block"
              />
            </header>
          )}

          {/* Article content with constrained width */}
          <article className="w-full lg:max-w-[1400px] mx-auto px-[30px]">
            <div className="mt-8 sm:mt-12">
              <h1 className="text-4xl md:text-6xl font-[800] mb-6 font-raleway text-black text-left">
                {blog?.title}
              </h1>

              <div className="flex items-center space-x-4 mb-8 mt-4 pb-4 border-b border-gray-100">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={
                        user?.image ||
                        "https://xsgames.co/randomusers/assets/avatars/male/46.jpg"
                      }
                      alt="Author avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>
                      {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {blog?.category && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="bg-ocean-blue/10 text-ocean-blue px-2 py-1 rounded-full text-xs">
                          {blog.category}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <ShareButton />
              </div>
            </div>

            {/* BlockNote Viewer */}
            {blog?.content && <BlogViewer content={blog.content} />}

            {/* Comments section placeholder */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              {/* Add comments component here later */}
            </div>
          </article>
        </>
      )}
    </>
  );
}
