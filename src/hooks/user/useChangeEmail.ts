import { toast } from "@/components/ui/Toast";
import { authClient } from "@/lib/auth/authClient";
import { User } from "@/lib/types/user";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useAppDispatch } from "../redux";
import { updateUser } from "@/lib/redux/slices/user";
export default function useChangeEmail({
  setError,
}: {
  setError: UseFormSetError<User>;
}) {
  const dispatch = useAppDispatch();
  const [isEmailChanging, setIsEmailChanging] = useState(false);

  // Placeholder for change email logic
  const changeEmail = async (newEmail: string) => {
    // Implement email change logic here
    setIsEmailChanging(true);
    const { data: changeEmailData, error } = await authClient.changeEmail({
      newEmail: newEmail,
      callbackURL: `/verify-email`,
    });
    if (error) {
      if (error.message) {
        toast.error("Email already exists");
        setError("email", {
          type: "manual",
          message: "Email already exists",
        });
      } else {
        toast.error("Failed to change email address. Please try again.");
      }
      setIsEmailChanging(false);
      return;
    }

    dispatch(updateUser({ email: newEmail }));
    setIsEmailChanging(false);
    toast.success("Please check your email to update your email address.");
  };
  return { changeEmail, isEmailChanging };
}
