import { toast } from "@/components/ui/Toast";
import { authClient } from "@/lib/auth/authClient";
import { useState } from "react";
import { useAppDispatch } from "../redux";
import { updateUser } from "@/lib/redux/slices/user";

export default function useTwoFactor() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const enable2FA = async (password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.twoFactor.enable({ password });
      
      if (data) {
        toast.success("2FA enabled successfully");
        dispatch(updateUser({ twoFactorEnabled: true }));
      } else if (error) {
        toast.error("Failed to enable 2FA: " + error.message);
      }
      
      setIsLoading(false);
      return { data, error };
    } catch (error) {
      setIsLoading(false);
      toast.error("An unexpected error occurred");
      return { data: null, error };
    }
  };

  const disable2FA = async (password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.twoFactor.disable({ password });
      
      if (data) {
        toast.success("2FA disabled successfully");
        dispatch(updateUser({ twoFactorEnabled: false }));
      } else if (error) {
        toast.error("Failed to disable 2FA: " + error.message);
      }
      
      setIsLoading(false);
      return { data, error };
    } catch (error) {
      setIsLoading(false);
      toast.error("An unexpected error occurred");
      return { data: null, error };
    }
  };

  return { enable2FA, disable2FA, isLoading };
}