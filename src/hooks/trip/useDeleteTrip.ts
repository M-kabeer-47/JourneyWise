import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tripId: string) => {
      const { data } = await axios.delete(`/api/delete-trip/${tripId}`);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch user trips
      queryClient.invalidateQueries({ queryKey: ["user-trips"] });
    },
    onError: (error) => {
      console.error("Failed to delete trip:", error);
    },
  });
}
