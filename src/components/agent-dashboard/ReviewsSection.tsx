import React from 'react';
import ReviewItem from '@/components/ui/ReviewItem';
import { Review } from '@/lib/types/Experience';

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm pb-[30px]">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-midnight-blue">Recent Reviews</h2>
        <button className="text-sm text-ocean-blue hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      <div className="p-6 space-y-4">
        {reviews.map((review) => (
          <ReviewItem 
            key={review.id} 
            review={review} 
            isAgent={true}
            className="border-0 shadow-none p-0 rounded-none border-b border-gray-100 last:border-b-0 pb-4"
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;