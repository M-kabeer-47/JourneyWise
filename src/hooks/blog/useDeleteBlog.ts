import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blogId: string) => {
      const { data } = await axios.delete(`/api/delete-blog/${blogId}`);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch user blogs
      queryClient.invalidateQueries({ queryKey: ["user-blogs"] });
    },
    onError: (error) => {
      console.error("Failed to delete blog:", error);
    },
  });
}
