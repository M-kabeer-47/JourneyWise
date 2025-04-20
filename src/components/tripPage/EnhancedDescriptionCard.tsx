
import React from 'react';
import { cn } from '@/utils/shadcn/utils'

interface EnhancedDescriptionCardProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
}

const EnhancedDescriptionCard = ({ title, content, icon, className }: EnhancedDescriptionCardProps) => {
  return (
    <div className={cn(
      "relative rounded-xl py-4 sm:py-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300",
      className
    )}>
      
      
      <div className={cn(icon ? "ml-2" : "")}>
        <h3 className="text-lg font-medium text-midnight-blue mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default EnhancedDescriptionCard;
