"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, Upload, Image as ImageIcon } from "lucide-react";
import CategoryDropdown from "@/components/create_experience/form/components/step-one/Category";
import { BLOG_CATEGORIES } from "@/lib/constants/blog-categories";
import Image from "next/image";

interface ThumbnailModalProps {
  isOpen: boolean;
  onConfirm: (data: { category: string; thumbnailUrl: string | null; thumbnailFile: File | null }) => void;
  onClose: () => void;
  title: string;
  description: string;
  loading?: boolean;
  loadingText?: string;
  initialCategory?: string;
}

const DEFAULT_THUMBNAILS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop&crop=center"
];

export default function ThumbnailModal({
  isOpen,
  onConfirm,
  onClose,
  title,
  description,
  loading = false,
  loadingText = "Loading...",
  initialCategory = ""
}: ThumbnailModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [categoryError, setCategoryError] = useState("");
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<File | null>(null);
  const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setUploadedThumbnail(file);
      const url = URL.createObjectURL(file);
      setUploadedThumbnailUrl(url);
      setSelectedThumbnail(null); // Clear default selection
    }
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleDefaultThumbnailSelect = (thumbnailUrl: string) => {
    setSelectedThumbnail(thumbnailUrl);
    setUploadedThumbnail(null);
    if (uploadedThumbnailUrl) {
      URL.revokeObjectURL(uploadedThumbnailUrl);
      setUploadedThumbnailUrl(null);
    }
  };



  const handleConfirm = () => {
    if (!selectedCategory) {
      setCategoryError("Please select a category");
      return;
    }
    setCategoryError("");
    
    const thumbnailData = {
      category: selectedCategory,
      thumbnailUrl: selectedThumbnail,
      thumbnailFile: uploadedThumbnail
    };
    
    onConfirm(thumbnailData);
  };

  const handleClose = () => {
    setCategoryError("");
    setSelectedCategory(initialCategory);
    setSelectedThumbnail(null);
    setUploadedThumbnail(null);
    if (uploadedThumbnailUrl) {
      URL.revokeObjectURL(uploadedThumbnailUrl);
      setUploadedThumbnailUrl(null);
    }
    onClose();
  };

  const currentThumbnail = uploadedThumbnailUrl || selectedThumbnail;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80"
        />

        {/* Modal Container */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-xl shadow-md w-full max-w-3xl max-h-[95vh] overflow-y-auto"
          >
            {/* Header with title and close button */}
            <div className="pt-8 px-8 pb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-charcoal">{title}</h2>
              <button
                onClick={handleClose}
                disabled={loading}
                className="text-charcoal hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mx-8"></div>

            {/* Content */}
            <div className="px-8 py-8">
              {/* Description */}
              <p className="text-charcoal text-sm mb-6">{description}</p>

              {/* Thumbnail Selection */}
              

              {/* Category Selection */}
              <div className="mb-6">
                <CategoryDropdown
                  label="Blog Category"
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={BLOG_CATEGORIES}
                  placeholder="Select a category"
                  error={categoryError}
                  disabled={loading}
                />
              </div>

              <div className="mb-8">
                <h3 className="text-sm sm:text-base font-semibold text-charcoal mb-4">Choose Thumbnail</h3>
                
                {/* Thumbnail Upload/Display Area */}
                <div className="mb-6" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                 
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={handleThumbnailClick}
                    disabled={loading}
                    className="w-full relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 
                             hover:border-midnight-blue transition-colors duration-200 disabled:opacity-50 group"
                  >
                    {currentThumbnail ? (
                      <div className="relative w-full h-48">
                        <Image
                          src={currentThumbnail}
                          alt="Selected thumbnail"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-full p-3">
                            <Upload className="w-6 h-6 text-charcoal" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          Click to change
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 flex flex-col items-center gap-3">
                        <Upload className="sm:w-12 sm:h-12 w-8 h-8 text-midnight-blue" />
                        <div className="text-center">
                          <span className="sm:text-sm text-xs text-charcoal block">Upload Thumbnail</span>
                          <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
                        </div>
                      </div>
                    )}
                  </button>
                </div>

                {/* Default Thumbnails */}
                <div className="mb-6">
                  <h4 className="text-sm  font-medium text-charcoal mb-3">Or choose from defaults:</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {DEFAULT_THUMBNAILS.map((thumbnail, index) => (
                      <button
                        key={index}
                        onClick={() => handleDefaultThumbnailSelect(thumbnail)}
                        disabled={loading}
                        className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 
                                  disabled:opacity-50 ${
                                    selectedThumbnail === thumbnail 
                                      ? 'border-ocean-blue ring-2 ring-ocean-blue/20' 
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                      >
                        <Image
                          src={thumbnail}
                          alt={`Default thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {selectedThumbnail === thumbnail && (
                          <div className="absolute inset-0 bg-ocean-blue/10 flex items-center justify-center">
                            <div className="w-6 h-6 bg-ocean-blue rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="min-[420px]:flex-row flex flex-col gap-4">
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 py-2 px-4 rounded-md border border-ocean-blue text-charcoal font-medium
                           transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 text-base"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 py-2 px-4 rounded-md text-base font-medium transition-all duration-200
                           bg-midnight-blue text-white disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{loadingText}</span>
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
