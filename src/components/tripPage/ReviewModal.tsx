import React, { useState, useRef } from 'react';
import { X, Star, ImagePlus } from 'lucide-react';
import { cn } from '@/utils/shadcn/utils';
import Spinner from '../ui/Spinner';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { rating: number; content: string; images?: string[] }) => Promise<void>;
  submitting: boolean;
}

const ReviewModal = ({ isOpen, onClose, onSubmit, submitting }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return; // Rating is required
    
    await onSubmit({
      rating,
      content,
      images: images.length > 0 ? images : undefined
    });
    
    // Reset form
    
    
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Process each selected file - limit to 4 images total
    const remainingSlots = 4 - images.length;
    const filesToProcess = Math.min(files.length, remainingSlots);
    
    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center top-[-60px]">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl" style={{maxHeight: '90vh'}}>
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-midnight-blue">Write a Review</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-midnight-blue rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Form */}
        <div className="p-5">
          <form onSubmit={handleSubmit}>
            {/* Rating */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate your experience
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                  >
                    <Star 
                      className={cn(
                        "w-8 h-8 transition-all",
                        (hoveredStar || rating) >= star 
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      )}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-xs text-ocean-blue">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              )}
            </div>
            
            {/* Review Content */}
            <div className="mb-5">
              <label htmlFor="review-content" className="block text-sm font-medium text-gray-700 mb-2">
                Your review
              </label>
              <textarea
                id="review-content"
                rows={3}
                className="w-full text-sm  border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-ocean-blue/30 focus:border-ocean-blue resize-none"
                placeholder="Share your experience and help others make better decisions..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            
            {/* Image Upload */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Add photos (optional)
                </label>
                <span className="text-xs text-gray-500">
                  {images.length}/4 photos
                </span>
              </div>
              
              {images.length < 4 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-ocean-blue/50 transition-colors">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center justify-center cursor-pointer py-2"
                  >
                    <ImagePlus className="w-6 h-6 mb-1 text-ocean-blue" />
                    <span className="text-sm text-gray-600">Upload photos</span>
                  </label>
                </div>
              ) : (
                <p className="text-xs text-amber-600">Maximum 4 photos allowed</p>
              )}

              {/* Preview Images */}
              {images.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {images.map((src, index) => (
                      <div key={index} className="relative w-16 h-16 group">
                        <img 
                          src={src} 
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={rating === 0}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-white font-medium",
                  "bg-gradient-to-r from-midnight-blue to-ocean-blue",
                  "hover:opacity-80 transition-all duration-200",
                  rating === 0 || content === "" ? "opacity-50 cursor-not-allowed" : "hover:shadow-md",
                  submitting ? "opacity-50 cursor-not-allowed w-[158px]" : ""

                )}
              >
                {submitting ? <Spinner
                size='small'
                 /> : "Submit Review"}
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;