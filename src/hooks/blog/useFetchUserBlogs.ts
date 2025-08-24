import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export function useFetchUserBlogs({
  userID,
  sortColumn,
  sortOrder,
  type,
  page,

}: {
  userID: string;
  sortColumn: string;
  sortOrder: "asc" | "desc";
  type: "all" | "published" | "draft";
  page: number;
}) {
  const isDesktop = useIsDesktop();
  const limit = isDesktop ? 5 : 3;

  let {data,isFetching,isError} = useQuery({
    queryKey: ["user-blogs", userID, page, limit, sortColumn, sortOrder],
    queryFn: async () => {
      const { data } = await axios.get("/api/get-user-blogs", {
        params: {
          userID,
          limit,
          page,
          sortColumn,
          sortOrder,
          type: type.toLowerCase()
        },
      });
      return data.blogs || [];
    },
    enabled: !!userID,
    refetchOnWindowFocus: false
  });
  return {blogs:data,isFetchingBlogs:isFetching,isBlogsError:isError}
}
