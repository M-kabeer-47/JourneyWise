import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/lib/types/user";
import {toast} from "@/components/ui/Toast"
import { useState } from "react";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
export default function useUpdateUser() {
    const [isLoading, setIsLoading] = useState(false);
  const updateUserFunction = async (data: User) => {
    setIsLoading(true);
    let userData = { ...data };
    if (typeof data.image !== "string" && data.image) {
      let ImageUrl = await uploadToCloudinary(data.image as File);
      userData.image = ImageUrl;
    }

    const response = await axios.put(`/api/update-user`, userData);
    
    return response.data;
  };
  const updateUser = useMutation({
    mutationFn: updateUserFunction,
    onSuccess: (data) => {
      toast.success("User updated successfully!");
      setIsLoading(false);
    },
    onError: (error) => {
        setIsLoading(false);
      toast.error("Error updating user");
    },
  });
  return { updateUser, isLoading };
}