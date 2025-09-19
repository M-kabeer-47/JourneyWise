import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Trip } from "@/lib/types/trip";
import { useSearchParams } from "next/navigation";

export default function useFetchTrips({ limit }: { limit?: number }) {
  const params = useSearchParams();

  const fetchTrips = async () => {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/get-trips?${params.toString()}&limit=${limit || 10}`
    );
    if (res.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return res.data;
  };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["trips", params.toString()],
    queryFn: fetchTrips,
    refetchOnWindowFocus: false,
  });

  return {
    trips: data?.trips as Trip[],
    isLoading,
    isFetching,
    totalPages: data?.pagination?.pages || 0,
    totalTrips: data?.totalTrips || 0,
  };
}
