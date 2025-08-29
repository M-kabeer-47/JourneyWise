"use client";

import usePublishBlog from "@/hooks/blog/usePublishBlog";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic"; // Add this import

// Dynamically import Editor with SSR disabled
const Editor = dynamic(() => import("@/components/blog/Editor"), {
  ssr: false,
});

export default function CreateBlogPage() {
  const { publishBlog, isPending } = usePublishBlog();
  const router = useRouter();

  const handlePublish = async (data: any) => {
    await publishBlog({
      title: data.title,
      html: data.content,
      coverUrl: data.coverUrl,
      thumbnailUrl: data.thumbnailUrl,
      isPublished: true,
      category: data.category,
      description: data.description
    });
  };

  const handleSaveDraft = async (data: any) => {
    await publishBlog({
      title: data.title,
      html: data.content,
      coverUrl: data.coverUrl,
      thumbnailUrl: data.thumbnailUrl,
      isPublished: false,
      description: data.description
    });
    localStorage.removeItem("blog-draft");
    localStorage.removeItem("blog-title");
    localStorage.removeItem("blog-cover");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <Editor
      type="create"
      publishBlog={handlePublish}
      saveAsDraftBlog={handleSaveDraft}
      isPublishing={isPending}
      onSuccess={() => router.push("/success/blog")}
    />
  );
}
