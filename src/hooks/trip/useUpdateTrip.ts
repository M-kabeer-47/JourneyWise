import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/Toast";
import { TripData } from "@/lib/schemas/trip";

interface UpdateTripData {
  tripId: string;
  tripData: TripData;
}

export default function useUpdateTrip() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async ({ tripId, tripData }: UpdateTripData) => {
      try {
        const response = await axios.put(`/api/update-trip/${tripId}`, tripData);
        return response.data;
      } catch (error) {
        console.error("Error updating trip:", error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      toast.success("Trip updated successfully!");
      
      // Invalidate and refetch the trip data
      queryClient.invalidateQueries({ 
        queryKey: ["trip", variables.tripId] 
      });
      
      // Optionally invalidate trips list if it exists
      queryClient.invalidateQueries({ 
        queryKey: ["trips"] 
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Failed to update trip";
      toast.error(errorMessage);
      console.error("Update trip error:", error);
    },
  });

  return {
    updateTrip: mutateAsync,
    isUpdating: isPending,
    isError,
    error,
  };
}
