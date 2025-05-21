"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '@/lib/types/experiences/Experience';
import ExperienceCard from '@/components/home/experiences/ExperienceCard';
import ExperienceSkeleton from '@/components/skeletons/ExperienceCardSkeleton'; // Assuming this exists

interface ExperienceGridProps {
  experiences: Experience[];
  isLoading: boolean;
  emptyMessage?: string;
  onClearFilters?: () => void;
}

const ExperienceGrid: React.FC<ExperienceGridProps> = ({
  experiences,
  isLoading,
  emptyMessage = "No experiences found",
  onClearFilters
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // If loading, show skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(9).fill(0).map((_, i) => (
          <ExperienceSkeleton key={i} />
        ))}
      </div>
    );
  }

  // If no experiences, show empty state
  if (experiences.length === 0) {
    return (
      <div className="bg-white rounded-xl p-10 text-center border border-gray-200">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.24 7.76C14.07 5.59 10.07 5.59 7.90002 7.76" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.90002 16.24C10.07 18.41 14.07 18.41 16.24 16.24" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.21 8.79L20.86 3.14" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.79002 8.79L3.14001 3.14" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.14001 20.86L8.79002 15.21" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.86 20.86L15.21 15.21" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{emptyMessage}</h3>
        <p className="text-gray-500 mb-6">
          Try adjusting your search or clear filters to see more results.
        </p>
        {onClearFilters && (
          <button 
            onClick={onClearFilters}
            className="px-4 py-2 bg-ocean-blue text-white text-sm font-medium rounded-md hover:bg-midnight-blue transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  // Show experiences grid
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {experiences.map(experience => (
        <motion.div 
          key={experience.id}
          variants={itemVariants}
        >
          <ExperienceCard experience={experience} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExperienceGrid;