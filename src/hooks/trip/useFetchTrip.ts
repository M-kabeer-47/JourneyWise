import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function useFetchTrip({id}: {id: string}) {
  const router = useRouter();

  const fetchTrip = async () => {
    try {
      let response = await axios.get(`/api/trip/${id}`);
      return response.data;
    } catch (err) {
      router.push("/not-found");

      return { trip: null, user: null };
    }
  };

  const {
    data: trip,
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trip", id],
    queryFn: fetchTrip,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { trip , isLoading, isFetching, isError };
}
