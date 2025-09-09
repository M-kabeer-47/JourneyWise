import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/lib/types/user";
import { toast } from "@/components/ui/Toast";
import { useState } from "react";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import { useAppDispatch } from "../redux";
import { updateUser as reduxUpdateUser } from "@/lib/redux/slices/user";
export default function useUpdateUser() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const updateUserFunction = async (data: User) => {
    setIsLoading(true);
    let userData = { ...data, id: data.id };
    if (typeof data.image !== "string" && data.image) {
      let ImageUrl = await uploadToCloudinary(data.image as File);
      userData.image = ImageUrl;
    }
    
      await axios.put(`/api/update-user`, userData);
    
    
    

    return userData;
  };
  const updateUser = useMutation({
    mutationFn: updateUserFunction,
    onSuccess: (data) => {
      dispatch(reduxUpdateUser(data));
      toast.success("User updated successfully!");
      setIsLoading(false);
    },
    onError: (error) => {
      
      console.log("Error: " + JSON.stringify(error?.response.data.message));
      if (error?.response.data.message === "Email already exists") {
        toast.error("Email already exists");
      } else {
        toast.error("Error updating user");
      }
      setIsLoading(false);
    },
  });
  return { updateUser, isLoading };
}
