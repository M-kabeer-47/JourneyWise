"use client";
import React from "react";
import { Star, User } from "lucide-react";
import Link from "next/link";
import { Review } from "@/lib/types/Experience";

interface ReviewItemProps {
  review: Review;
  isAgent?: boolean;
  onImageClick?: (imageUrl: string) => void;
  className?: string;
}

const ReviewItem = ({
  review,
  isAgent = false,
  onImageClick,
  className = "",
}: ReviewItemProps) => {
  return (
    <div
      className={`bg-white rounded-xl border-b border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-ocean-blue/10 flex items-center justify-center">
            {review.userImage ? (
              <img
                src={review.userImage}
                alt={review.userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-ocean-blue" />
            )}
          </div>
          <h3 className="font-medium text-midnight-blue">{review.userName}</h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{review.rating}</span>
          </div>

          {/* Agent Reply Link */}
          {isAgent  && (
            <Link
              href={`/agent/experiences/${review.experienceId}`}
              className="text-sm text-ocean-blue hover:text-blue-700 font-medium transition-colors"
            >
              Reply
            </Link>
          )}
        </div>
      </div>

      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3">
        {review.comment}
      </p>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {review.images.map((image, index) => (
              <button
                key={index}
                onClick={() => onImageClick?.(image)}
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
  );
};

export default ReviewItem;
