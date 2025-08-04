import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { clearExperienceData } from "@/lib/redux/slices/experience";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import { toast } from "@/components/ui/Toast";
import axios from "axios";
import { StepFourType } from "@/lib/types/create-experience-steps";

export const useExperienceSubmission = () => {
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
        title: completeData.title,
        country: completeData.country,
        city: completeData.city,
        category: completeData.category,
        countryCode: completeData.countryCode,
        duration: completeData.duration,
        tags: completeData.tags,
        description: completeData.description,
        available: completeData.available,
        experienceImage: uploadedMainImage,
        experienceImages: uploadedGalleryImages,
        includedServices: completeData.includedServices,
        excludedServices: completeData.excludedServices,
        destinations: completeData.destinations,
        currency: completeData.currency,
        tiers: {
          tiers: completeData.tiers,
          currency: completeData.currency,
        },
        requirements: completeData.requirements,
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

      const response = await axios.post("/api/create-experience", {
        data: submissionData,
      });

      if (response.status === 200) {
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
