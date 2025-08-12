"use client";
import React, { useRef, useEffect } from "react";
import { Camera, ImageOff } from "lucide-react";

interface BlogCoverProps {
  coverUrl: string | null;
  onCoverPicked: (file: File) => void;
  onRemoveCover: () => void;
}

export const BlogCover: React.FC<BlogCoverProps> = ({
  coverUrl,
  onCoverPicked,
  onRemoveCover,
}) => {
  const coverInputRef = useRef<HTMLInputElement>(null);

  const pickCover = () => coverInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onCoverPicked(file);
    e.target.value = ""; // Reset input
  };

  if (!coverUrl) {
    return (
      <>
        <div className="relative group mb-4 px-4 sm:px-24">
          <button
            type="button"
            onClick={pickCover}
            className="absolute top-2 left-[100px] opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 text-sm rounded-sm bg-white py-2 px-2 hover:bg-neutral-100"
          >
            📸 Add cover
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={coverInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </>
    );
  }

  return (
    <>
      <div className="w-full h-48 sm:h-56 md:h-64 relative bg-light-gray group">
        <img
          src={coverUrl}
          alt="Cover"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-5 right-[20px] z-10 hidden group-hover:flex gap-6">
          <button
            type="button"
            onClick={onRemoveCover}
            className="flex w-[160px] gap-2 px-3 py-2 text-sm text-charcoal rounded-sm items-center justify-center bg-white"
          >
            <ImageOff className="w-4 h-4 text-coral-red" />
            Remove image
          </button>
          <button
            type="button"
            onClick={pickCover}
            className="flex w-[150px] gap-2 px-3 py-2 text-sm text-charcoal rounded-sm items-center justify-center bg-white"
          >
            <Camera className="w-4 h-4 text-midnight-blue" />
            Change cover
          </button>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={coverInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};
