import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../types';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
        ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 text-amber-400 fill-current" />
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start">
        <img 
          src={review.userImage} 
          alt={review.userName}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-900">{review.userName}</p>
            <p className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            For: <span className="font-medium">{review.experienceTitle}</span>
          </p>
          <div className="mt-1">
            {renderStars(review.rating)}
          </div>
          <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
          <div className="mt-2">
            <button className="text-xs text-ocean-blue font-medium hover:text-blue-700 transition-colors">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;