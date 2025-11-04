import axios from "axios";

// Overloaded function signatures
export async function uploadToCloudinary(file: File | string): Promise<string>;
export async function uploadToCloudinary(options: {
  file: File | string;
  attachmentType: string;
  onProgress?: (progress: number) => void;
}): Promise<string>;

// Implementation
export async function uploadToCloudinary(
  fileOrOptions: File | string | {
    file: File | string;
    attachmentType: string;
    onProgress?: (progress: number) => void;
  }
): Promise<string> {
  // Handle old signature (backwards compatibility)
  if (fileOrOptions instanceof File || typeof fileOrOptions === "string") {
    const file = fileOrOptions;
    if (typeof file === "string" && file.startsWith("http")) {
      return file;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }

  // Handle new signature with progress tracking
  const { file, attachmentType, onProgress } = fileOrOptions;

  if (typeof file === "string" && file.startsWith("http")) {
    return file;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
  );

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const progress = Math.round(
        (progressEvent.loaded * 100) / (progressEvent.total || 1)
      );
      if (onProgress) {
        onProgress(progress);
      }
    },
  };

  try {
    console.log("Uploading to Cloudinary");
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      }/${attachmentType === "image" ? "image" : "raw"}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...config,
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}