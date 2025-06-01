import React from 'react';
import ReviewItem from './ReviewItem';
import { Review } from '../../../../src/lib/data';

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-midnight-blue">Recent Reviews</h2>
        <button className="text-sm text-ocean-blue hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;