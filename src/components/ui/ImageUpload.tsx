// Create a new file: src/components/ui/ImageUpload.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value?: File; // Add value prop to show existing image
  onRemove?: () => void; // Add remove callback
}

export const ImageUpload = ({
  onImageUpload,
  label,
  placeholder = "Click to upload or drag and drop",
  required = false,
  className = "",
  value,
  onRemove,
}: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        const file = acceptedFiles[0];
        onImageUpload(file);

        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    },
    noClick: false,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    onRemove?.();
  };

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);

      // Cleanup function
      
    } else {
      setPreviewUrl(null);
    }
    return () => URL.revokeObjectURL(previewUrl);
  }, [value]);

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-base font-medium text-midnight-blue">
        {label} {!required && "(Optional)"}
      </label>
      <div className="relative">
        <div {...getRootProps()} className="group relative">
          <div
            className={`flex items-center justify-center w-full h-32  transition bg-white border-2 ${
              isDragging
                ? "border-ocean-blue bg-ocean-blue/10"
                : "border-gray-300"
            } border-dashed rounded-lg cursor-pointer hover:border-ocean-blue focus:outline-none overflow-hidden`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
          >
            {previewUrl ? (
              // Show uploaded image
              <div className="relative w-full h-full">
                <img
                  src={previewUrl}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="p-2 bg-white/90 text-gray-800 rounded-full">
                      <Upload className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Show upload placeholder
              <div className="flex flex-col items-center space-y-2">
                <Upload
                  className={`w-6 h-6 ${
                    isDragging ? "text-ocean-blue" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    isDragging ? "text-ocean-blue" : "text-gray-500"
                  }`}
                >
                  {isDragging ? "Drop image here" : placeholder}
                </span>
              </div>
            )}
            <input {...getInputProps()} />
          </div>
        </div>
      </div>
    </div>
  );
};
