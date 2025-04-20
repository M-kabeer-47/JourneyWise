
import React from 'react';
import { cn } from '@/utils/shadcn/utils';

interface CategoryTagsProps {
  category: string;
  tags: string[];
  className?: string;
}

const CategoryTags = ({ category, tags, className }: CategoryTagsProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="text-sm font-medium text-gray-700">{category}</div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryTags;
