import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { clearExperienceData } from "@/lib/redux/slices/experience";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import { toast } from "@/components/ui/Toast";
import axios from "axios";
import { StepFourType } from "@/lib/types/create-experience-steps";

export const useExperienceSubmission = ({ type }: { type: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const experienceData = useAppSelector((state) => state.experienceData);
  const dispatch = useAppDispatch();

  const submitExperience = async (stepFourData: StepFourType) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Merge all step data
      const completeData = {
        ...experienceData,
        ...stepFourData,
      };
      
      // Upload images concurrently
      const [uploadedMainImage, uploadedGalleryImages] = await Promise.all([
        uploadToCloudinary(completeData.experienceImage),
        Promise.all(
          completeData.experienceImages.map((image) =>
            uploadToCloudinary(image)
          )
        ),
      ]);

      // Format submission data
      const submissionData = {
        ...completeData,
        experienceImage: uploadedMainImage,
        experienceImages: uploadedGalleryImages,
        agentID: "4d19d13d-4c4b-4462-98a1-ab88c19aeb32",
        location: {
          country: completeData.country,
          city: completeData.city,
        },
        minPrice: Math.min(...completeData.tiers.map((t) => t.price)),
        averageRating: 0,
        itineraryDetails: completeData.destinations,
        isAvailable: completeData.available,
      };
      if (type === "edit") {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-experience/${completeData.id}`,
          {
            experience: submissionData,
          }
        );
        if (response.status === 200) {
          toast.success("Experience updated successfully!");
          dispatch(clearExperienceData());
          return { success: true, data: response.data };
        } else {
          toast.error("Failed to update experience!");
        }
      }
      delete submissionData.id; // Remove ID for new experience creation
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-experience`, {
        data: submissionData,
      });

      if (response.status === 201) {
        toast.success("Experience created successfully!");

        // Clear the form data after successful submission
        dispatch(clearExperienceData());

        return { success: true, data: response.data };
      } else {
        toast.error("Failed to create experience!");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Experience creation failed! Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);

      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setError(null);
    setIsSubmitting(false);
  };

  return {
    submitExperience,

    isSubmitting,
    error,
    reset,
  };
};
