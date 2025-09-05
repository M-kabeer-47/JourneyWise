import { toast } from "@/components/ui/Toast";
import { authClient } from "@/lib/auth/authClient";
import { useState } from "react";

export default function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    setIsLoading(true);

    const { data, error } = await authClient.changePassword({
      newPassword,
      currentPassword,
      revokeOtherSessions: true,
    });

    if (data) {
      toast.success("Password changed successfully");
    } else if (error) {
      toast.error(error.message || "Failed to change password");
    }

    setIsLoading(false);
    return { data, error };
  };

  return { changePassword, isLoading };
}
