"use client";
import React, { useState } from "react";
import { Star, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ReviewModal from "./ReviewModal";
import ImageModal from "../ui/ImageModal";
import ReviewItem from "../ui/ReviewItem";
import { Review } from "@/lib/types/Experience";

interface ReviewSectionProps {
  rating: number;
  totalReviews: number;
  reviews: Review[];
  className?: string;
}

const ReviewSection = ({
  rating,
  totalReviews,
  reviews,
  className,
}: ReviewSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [reviewsList, setReviewsList] = useState<Review[]>(reviews);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (newReview: {
    rating: number;
    content: string;
    images?: string[];
  }) => {
    setSubmitting(true);
    // In a real app, you would send this to your backend API
    // For now, we'll just add it to the local state
    const review: Review = {
      id: `rev${reviewsList.length + 1}`,
      userName: "You", // In a real app, this would come from the authenticated user
      userImage: "https://via.placeholder.com/40", // Placeholder image, replace with actual user image
      experienceTitle: "Experience Title", // Replace with actual experience title
      rating: newReview.rating,
      comment: newReview.content,
      images: newReview.images,
      createdAt: "",
      experienceId: ""
    };
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
    setReviewsList([review, ...reviewsList]);
    setIsModalOpen(false);
    setSubmitting(false);
    // You might want to update the average rating as well
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-midnight-blue flex items-center">
            Reviews
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full ml-3 text-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{rating}</span>
            </span>
          </h2>
        </div>

        <button
          className="inline-flex items-center justify-center px-4 py-2 border border-ocean-blue text-ocean-blue rounded-lg hover:bg-ocean-blue/5 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Write a Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reviewsList.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            isAgent={false}
            onImageClick={openImageModal}
          />
        ))}
      </div>

      {reviewsList.length > 4 && (
        <div className="flex justify-center mt-6">
          <button className="px-6 py-2 border border-gray-200 rounded-lg text-midnight-blue hover:bg-gray-50 transition-colors">
            Load More Reviews
          </button>
        </div>
      )}

      {/* Review Modal */}
      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitReview}
          submitting={submitting}
        />
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageUrl={selectedImage}
          alt="Review image"
        />
      )}
    </div>
  );
};

export default ReviewSection;
