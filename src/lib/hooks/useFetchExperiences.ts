import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Experience } from "@/lib/types/experiences/Experience";
import { useSearchParams } from "next/navigation";


export default function useFetchExperiences() {
  const params = useSearchParams();
  const fetchExperiences = async () => {
    const res = await axios.get(`/api/experiences?${params.toString()}`);
    if (res.status !== 200) {
      throw new Error("Network response was not ok");
    }
    
    return res.data;
  };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["home", params.toString()],
    queryFn: fetchExperiences,
    refetchOnWindowFocus: false,
  });

  return {
    experiences: data?.experiences as Experience[],
    isLoading,
    isFetching,
    totalPages: data?.pagination?.pages || 0,
    totalExperiences: data?.pagination?.total || 0,
  };
}
