"use client";
import Editor from "@/components/blog/Editor";
import usePublishBlog from "@/hooks/blog/usePublishBlog";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const { publishBlog, isPending } = usePublishBlog();
  const router = useRouter();

  const handlePublish = async (data: any) => {
    await publishBlog({
      title: data.title,
      html: data.content,
      coverUrl: data.coverUrl,
      isPublished: true,
    });
  };

  const handleSaveDraft = async (data: any) => {
    await publishBlog({
      title: data.title,
      html: data.content,
      coverUrl: data.coverUrl,
      isPublished: false,
    });
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
