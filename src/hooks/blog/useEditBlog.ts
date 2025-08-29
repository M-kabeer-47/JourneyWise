import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/Toast";
import { useQueryClient } from "@tanstack/react-query";
export default function useEditBlog() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async (data: {
      title: string;
      html: string;
      coverUrl: string | null;
      thumbnailUrl: string | null;
      id: string;
      category: string | null;
      description: string;
    }) => {
      try {
        let response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-blog/${data.id}`,
          {
            title: data.title,
            content: data.html,
            coverUrl: data.coverUrl,
            thumbnailUrl: data.thumbnailUrl,
            category: data.category,
            description: data.description,
          }
        );
        toast.success("Blog saved successfully");

        queryClient.invalidateQueries({ queryKey: ["user-blogs","blogs","saved-posts"] });
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
