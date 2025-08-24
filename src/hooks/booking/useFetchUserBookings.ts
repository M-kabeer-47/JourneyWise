import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export function useFetchUserBookings({
  userID,
  sortColumn,
  sortOrder,
  status,
  page,
}: {
  userID: string;
  sortColumn: string;
  sortOrder: "asc" | "desc";
  status: string;
  page: number;
}) {
  const isDesktop = useIsDesktop();
  const limit = isDesktop ? 5 : 3;

  let {data,isFetching,isError} =  useQuery({
    queryKey: ["user-bookings", userID, page,sortColumn,status,sortOrder],
    queryFn: async () => {
      const { data } = await axios.get("/api/get-user-bookings", {
        params: {
          userID,
          limit,
          page,
          sortColumn,
          sortOrder,
          status: status.toLowerCase()
          
        },
      });
      return data.bookings || [];
    },
    enabled: !!userID,
  });
  return {bookings:data,isFetchingBookings:isFetching,isBookingsError:isError}
}

