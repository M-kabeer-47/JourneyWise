import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/Toast";
import { useAppSelector } from "@/hooks/redux";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import { GuideData, WaypointData } from "@/lib/schemas/trip";

interface TripSubmissionData {
  guideDetails: GuideData;
  waypoints: WaypointData[];
  thumbnailUrl: File | string | null;
}

export default function useCreateTrip() {
  const user = useAppSelector((state) => state.user.user);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: TripSubmissionData) => {
      try {
        if (!user) {
          toast.error("Please login to create trip");
          return;
        }
        console.log("Thumbnail URL: " + data.thumbnailUrl);
        // Upload thumbnail if exists
        let uploadedThumbnailUrl = null;
        if (data.thumbnailUrl) {
          if (data.thumbnailUrl instanceof File) {
            // Upload file to Cloudinary
            uploadedThumbnailUrl = await uploadToCloudinary(data.thumbnailUrl);
          } else if (typeof data.thumbnailUrl === 'string') {
            // Use the string URL directly
            uploadedThumbnailUrl = data.thumbnailUrl;
          }
        }

        // Upload waypoint images
        const waypointsWithUploadedImages = await Promise.all(
          data.waypoints.map(async (waypoint) => {
            if (
              waypoint.imageUrl &&
              waypoint.imageUrl !== "" &&
              waypoint.imageUrl instanceof File
            ) {
              const uploadedUrl = await uploadToCloudinary(waypoint.imageUrl);
              return { ...waypoint, imageUrl: uploadedUrl };
            } else if (
              typeof waypoint.imageUrl === "string" &&
              waypoint.imageUrl.startsWith("blob:")
            ) {
              // Clean up blob URLs that weren't uploaded
              URL.revokeObjectURL(waypoint.imageUrl);
            }
            return waypoint;
          })
        );

        // Prepare final data
        const finalTripData = {
          userID: user.id,
          ...data.guideDetails,
          waypoints: waypointsWithUploadedImages,
          thumbnailUrl: uploadedThumbnailUrl,
        };

        await axios.post("/api/create-trip",  finalTripData );
        toast.success("Trip planned successfully");

        return finalTripData;
      } catch (error) {
        console.error("Error creating trip:", error);
        toast.error("Trip planning failed");
        throw error;
      }
    },
  });

  return {
    createTrip: mutateAsync,
    isCreating: isPending,
  };
}
