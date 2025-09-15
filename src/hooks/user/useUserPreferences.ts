import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  PreferencesUpdate,
  PreferencesForm,
} from "@/lib/schemas/userPreferences";
import { toast } from "@/components/ui/Toast";
import { useState } from "react";

export default function usePreferences() {
  const [isLoading, setIsLoading] = useState(false);

  const updatePreferencesFunction = async (data: PreferencesUpdate) => {
    setIsLoading(true);

    try {
      const response = await axios.put(`/api/update-user-preferences`, data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPreferencesFunction = async (): Promise<PreferencesForm> => {
    try {
      const response = await axios.get(`/api/get-user-preferences`);
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch preferences");
      throw error;
    }
  };

  const updatePreferences = useMutation({
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

  const { data: preferences, isLoading: isFetching } = useQuery({
    queryKey: ["user-preferences"],
    queryFn: fetchPreferencesFunction,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    updatePreferences,
    preferences,
    isLoading: isLoading || updatePreferences.isPending,
    isFetching,
  };
}
