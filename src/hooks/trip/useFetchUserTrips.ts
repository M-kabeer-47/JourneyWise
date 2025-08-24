import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export function useFetchUserTrips({
  userID,
  sortColumn,
  sortOrder,
  page,
}: {
  userID: string;
  sortColumn: string;
  sortOrder: "asc" | "desc";
  page: number;
}) {
  const isDesktop = useIsDesktop();
  const limit = isDesktop ? 5 : 3;

  let {data,isFetching,isError} =  useQuery({
    queryKey: ["user-trips", userID, page, limit, sortColumn, sortOrder],
    queryFn: async () => {
      const { data } = await axios.get("/api/get-user-trips", {
        params: {
          userID,
          limit,
          page,
          sortColumn,
          sortOrder,
        },
      });
      return data.trips || [];
    },
    enabled: !!userID,
  });
  return {trips:data,isFetchingTrips:isFetching,isTripsError:isError}
}
