import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  PreferencesUpdate,
  PreferencesForm,
} from "@/lib/schemas/userPreferences";
import { toast } from "@/components/ui/Toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
export default function usePreferences() {
  const queryClient = useQueryClient();

  const handleOptimisticUpdates = (queryKey, newData) => {
    queryClient.setQueriesData({ queryKey: [queryKey] }, (old: any) => {
      console.log("Old Data: ", old);
      console.log("New Data: ", newData);
      return {
        ...old,
        ...newData,
      };
    });
  };

  const updatePreferencesFunction = async (data: PreferencesUpdate) => {
    try {
      const response = await axios.put(`/api/update-user-preferences`, data);
      console.log("Response from updating api: "+JSON.stringify(response.data));
      handleOptimisticUpdates("user-preferences", response.data.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchPreferencesFunction = async (): Promise<PreferencesForm> => {
    try {
      const response = await axios.get(`/api/get-user-preferences`);
      console.log("Fetched Prferences: " + JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch preferences");
      throw error;
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updatePreferencesFunction,
    onSuccess: () => {
      toast.success("Preferences updated successfully!");
    },
    onError: (error: any) => {
      console.log(
        "Error updating preferences:",
        error?.response?.data?.message
      );

      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update preferences");
      }
    },
  });

  const {
    data: preferences,
    isFetching,
    isError: isFetchingError,
  } = useQuery({
    queryKey: ["user-preferences"],
    queryFn: fetchPreferencesFunction,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    updatePreferences: mutateAsync,
    preferences,
    isUpdating: isPending,
    isFetching,
    isFetchingError,
  };
}
