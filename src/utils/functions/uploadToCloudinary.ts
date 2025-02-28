"use server"
import dotenv from "dotenv"
dotenv.config()
export const uploadToCloudinary = async (file: File | string): Promise<string> => {
    console.log("env",process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
    console.log("env",process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
    console.log("env",process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
    const formData = new FormData();
    console.log("file",file)
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };