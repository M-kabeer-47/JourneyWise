"use client";
import { useState } from "react";
export default function CheckPage() {
  const [imageUrl, setImageUrl] = useState<String | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];
      if (!file) {
        // setImageUrl(null);
        return;
      }
      let imagePreview = URL.createObjectURL(file);
      setImageUrl(imagePreview);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    let files = e.dataTransfer.files;
    const file = files[0];
    if (!file) {
      // setImageUrl(null);
      return;
    }
    let imagePreview = URL.createObjectURL(file);
    setImageUrl(imagePreview);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Check Page</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        id="fileInput"
        hidden
      />

      <img src={imageUrl} alt="wait..."></img>
      <label htmlFor="fileInput" className="cursor-pointer">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="bg-gray-100 h-[400px] p-4 rounded mt-4 flex flex-col items-center justify-center"
        >
          <p className="text-lg">
            Click here to upload an image and display it below. The image will
            be displayed once you select a file.
          </p>
        </div>
      </label>

      {imageUrl && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            setImageUrl(null);
          }}
        >
          Clear Image
        </button>
      )}
    </div>
  );
}
