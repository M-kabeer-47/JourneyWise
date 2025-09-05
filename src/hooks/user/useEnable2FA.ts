import { toasts as toast } from "@/components/ui/Toast";
import { authClient } from "@/lib/auth/authClient";
import { useState } from "react";
import { useAppDispatch } from "../redux";
import { updateUser } from "@/lib/redux/slices/user";
export default function useEnable2FA() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const enable2FA = async (password: string) => {
    setIsLoading(true);
    const { data, error } = await authClient.twoFactor.enable({ password });
    if (data) {
      toast.success("2FA enabled successfully");
      
      dispatch(updateUser({ twoFactorEnabled: true }));
    } else if (error) {
      toast.error("Failed to enable 2FA: " + error.message);
      setIsLoading(false);
      
    }
    setIsLoading(false);

    return { data, error };
  };
  return { enable2FA, isLoading };
}
