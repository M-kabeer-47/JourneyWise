import { useState, useEffect, useRef } from "react";
import { Upload, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string | File;
  onChange: (file: File | string) => void;
  error?: string;
}

export default function ImageUpload({
  value,
  onChange,
  error,
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection (both click and drop)
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      onChange(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      handleFileSelect(imageFile);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    onChange("");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Set initial preview if value has an image
  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        setImagePreview(value);
      } else if (value instanceof File) {
        const previewUrl = URL.createObjectURL(value);
        setImagePreview(previewUrl);

        // Cleanup function
        return () => URL.revokeObjectURL(previewUrl);
      }
    } else {
      setImagePreview(null);
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <label className="block text-base font-medium text-midnight-blue">
        Experience Image
      </label>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg transition-all duration-200 ${
          isDragOver
            ? "border-ocean-blue bg-ocean-blue/5"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          id="experienceImageUpload"
        />

        {imagePreview ? (
          // Image Preview
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Experience preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <div className="flex gap-2">
                <label
                  htmlFor="experienceImageUpload"
                  className="px-3 py-2 bg-white text-midnight-blue rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Change
                </label>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Upload Area
          <label
            htmlFor="experienceImageUpload"
            className="block p-8 text-center cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
                  isDragOver
                    ? "bg-ocean-blue text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <ImageIcon className="w-8 h-8" />
              </div>
              <div className="text-lg font-medium text-midnight-blue mb-2">
                {isDragOver ? "Drop image here" : "Upload Experience Image"}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Drag and drop an image or click to browse
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-ocean-blue text-white rounded-lg text-sm font-medium hover:bg-ocean-blue/90 transition-colors">
                <Upload className="w-4 h-4" />
                Choose File
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Supports: JPG, PNG, WebP (Max 10MB)
              </div>
            </div>
          </label>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {typeof error !== "string" ? error : "Experience image is required"}
        </p>
      )}
    </div>
  );
}
