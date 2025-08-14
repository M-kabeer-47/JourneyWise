import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/Toast";
export default function usePublishBlog() {
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async (data: {
      title: string;
      html: string;
      coverUrl: string | null;
      id: string;
      category: string | null;
    }) => {
      try {
        let response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-blog/${data.id}`,
          {
            title: data.title,
            content: data.html,
            coverUrl: data.coverUrl,
            category: data.category,
          }
        );
        toast.success("Blog saved successfully");
        return response.data;
      } catch (error) {
        toast.error("Error saving blog");
      } finally {
      }
    },
  });
  return {
    saveBlog: mutateAsync,
    isPending,
  };
}
