"use client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import useFetchExperience from "@/hooks/experience/useFetchExperience";
import { useAppDispatch } from "@/hooks/redux";
import { updateExperienceData } from "@/lib/redux/slices/experience";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function updateExperience() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const { experience, isLoading } = useFetchExperience(id);
  useEffect(() => {
    if (experience) {
      dispatch(
        updateExperienceData({
          ...experience.experience,
          ...experience.experience.location,
          destinations: [...experience.experience.itineraryDetails],
        })
      ); // Update the experience data in the store
      router.push(`/update-experience/${id}/step-one`); // Redirect to step one
    }
  }, [experience, dispatch]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Loader2 className="animate-spin h-8 w-8 text-midnight-blue" />
      </div>
    );
  }
}
