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

const fetchBlogs = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-blogs`
  );
  return data;
};

export const useFetchBlogs = () => {
  const params = useSearchParams();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["blogs", params.toString()],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isFetching };
};
