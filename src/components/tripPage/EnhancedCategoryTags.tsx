
import React from 'react';
import { cn } from '@/utils/shadcn/utils'

interface EnhancedCategoryTagsProps {
  category: string;
  tags: string[];
  className?: string;
}

const EnhancedCategoryTags = ({ category, tags, className }: EnhancedCategoryTagsProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="text-sm font-medium text-midnight-blue">{category}</div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-ocean-blue/10 to-ocean-blue/5 text-ocean-blue border border-ocean-blue/10 shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EnhancedCategoryTags;
