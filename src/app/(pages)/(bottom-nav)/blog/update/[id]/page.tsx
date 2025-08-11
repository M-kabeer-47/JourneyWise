"use client";
import { useParams } from "next/navigation";

import useSaveBlog from "@/hooks/blog/useSaveBlog";
import useFetchBlog from "@/hooks/blog/useFetchBlog";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import dynamic from "next/dynamic"; // Add this import

// Dynamically import Editor with SSR disabled
const Editor = dynamic(() => import("@/components/blog/Editor"), {
  ssr: false,
});

export default function UpdateBlogPage() {
  const params = useParams();
  const blogId = params.id as string;
  const router = useRouter();

  // Fetch blog data
  const { data: blogData, isLoading, error } = useFetchBlog(blogId);

  // Save/update blog hook
  const { saveBlog, isPending: isUpdating } = useSaveBlog();

  const handleUpdate = async (data: any) => {
    await saveBlog({
      id: blogId,
      title: data.title,
      html: data.content,
      coverUrl: data.coverUrl,
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center flex flex-col items-center">
          <Spinner size="small" />
          <p className="mt-4 text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">Failed to load blog post</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-ocean-blue text-white rounded-md hover:bg-ocean-blue/90"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Blog not found
  if (!blogData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Blog Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The blog post you're looking for doesn't exist
          </p>
          <button
            onClick={() => router.push("/blog")}
            className="px-4 py-2 bg-ocean-blue text-white rounded-md hover:bg-ocean-blue/90"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  // Parse blocks content if it exists

  return (
    <Editor
      type="update"
      initialTitle={blogData.blog.title}
      initialContent={blogData.blog.content}
      initialCoverUrl={blogData.blog.coverUrl}
      updateBlog={handleUpdate}
      isPublishing={isUpdating}
      onSuccess={() => router.push("/success/blog-updated")}
    />
  );
}
