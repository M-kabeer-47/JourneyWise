"use client"
import React, { useState } from 'react';
import { Star, MessageCircle, User } from 'lucide-react';
import { cn } from '@/utils/shadcn/utils';
import ReviewModal from './ReviewModal';
import ImageModal from '../ui/ImageModal';

export interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  content: string;
  images?: string[];
}

interface ReviewSectionProps {
  rating: number;
  totalReviews: number;
  reviews: Review[];
  className?: string;
}

const ReviewSection = ({ rating, totalReviews, reviews, className }: ReviewSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>(reviews);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (newReview: { rating: number; content: string; images?: string[] }) => {
    setSubmitting(true);
    // In a real app, you would send this to your backend API
    // For now, we'll just add it to the local state
    const review: Review = {
      id: `rev${reviewsList.length + 1}`,
      user: {
        name: "You", // In a real app, this would come from the authenticated user
      },
      rating: newReview.rating,
      content: newReview.content,
      images: newReview.images
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
          <div 
            key={review.id} 
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-ocean-blue/10 flex items-center justify-center">
                  {review.user.avatar ? (
                    <img 
                      src={review.user.avatar} 
                      alt={review.user.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-ocean-blue" />
                  )}
                </div>
                <h3 className="font-medium text-midnight-blue">{review.user.name}</h3>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium">{review.rating}</span>
              </div>
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">{review.content}</p>
            
            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {review.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openImageModal(image)}
                      className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    >
                      <img 
                        src={image} 
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
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