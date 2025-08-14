import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BlogData {
  blog: {
    category: string | null | undefined;
    id: string;
    title: string;
    content: string;
    blocks?: string;
    coverUrl?: string;
    createdAt: string;
    updatedAt: string;
  };

  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

const useFetchBlog = (blogId: string) => {
  return useQuery({
    queryKey: ["blog", blogId],
    queryFn: async (): Promise<BlogData> => {
      if (!blogId) {
        throw new Error("Blog ID is required");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-blog/${blogId}`
      );
      return response.data;
    },
    enabled: !!blogId, // Only run query if blogId exists
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export default useFetchBlog;
