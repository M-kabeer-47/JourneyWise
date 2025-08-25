"use client"
import axios from "axios"
import {useState,useEffect} from "react"
import { ExperienceResponse } from "@/lib/types/experience";
export default function useFetchExperience(id: string) {
  const [experience, setExperience] = useState<ExperienceResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   const fetchTrip = async () => {
       try {
         let response = await axios.get(
           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-experience/${id}`
         );
         setIsLoading(false);
         setExperience(response.data);
       } catch (error) {
         setError("Error fetching experience");
       }
     };

    fetchTrip();
  }, [id]);

  return { experience, isLoading, error };
}
