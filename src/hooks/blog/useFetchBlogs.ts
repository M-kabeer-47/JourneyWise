import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface BlogAuthor {
  name: string;
  image?: string;
}

interface Blog {
  blog: {
    id: string;
    title: string;
    content: string;
    coverUrl?: string;
    isPublished: boolean;
    authorID: string;
    createdAt: string;
    updatedAt: string;
    commentsCount: number;
  };
  author: BlogAuthor;
}

export const useFetchBlogs = ({ limit }: { limit?: number }) => {
  const params = useSearchParams();

  const fetchBlogs = async (params: URLSearchParams) => {
    const { data } = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/get-blogs?${params.toString()}&limit=${limit || 10}`
    );
    return data;
  };

  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["blogs", params.toString(), limit],
    queryFn: () => fetchBlogs(params),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isFetching };
};
