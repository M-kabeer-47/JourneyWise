import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import axios from "axios";
import BlogPageSkeleton from "@/components/skeletons/BlogPageSkeleton";
import ShareButton from "@/components/ui/ShareButton";
import dynamic from "next/dynamic";
import formatDate from "@/utils/functions/formatDate";
import DynamicBlogViewer from "@/components/blog/DynamicBlogViewer";
let isLoading = true;

// Dynamically import BlogViewer with SSR disabled


async function fetchBlogData(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-blog/${id}`
    );
    
    if (!response.data.blog.isPublished) {
      notFound();
    }
    
    isLoading = false;
    return {
      blog: response.data.blog,
      user: response.data.user,
    };
  } catch (error) {
    notFound();
  }
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  const Params = await params;
  const { blog, user } = await fetchBlogData(Params.id);

  return (
    <>
      {isLoading || !blog ? (
        <BlogPageSkeleton />
      ) : (
        <>
      {/* Full width cover image - outside article container */}
      {blog?.coverUrl && (
        <header className="w-[1400px] mx-auto">
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
                  {formatDate(blog?.createdAt)}
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
        {blog?.content && <DynamicBlogViewer content={blog.content} />}

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
