import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/utils/shadcn/utils';



interface EnhancedServicesListProps {
  title: string;
  services: string[]; 
  type: 'included' | 'excluded';
  className?: string;
}

const EnhancedServicesList = ({ title, services, type, className }: EnhancedServicesListProps) => {
  return (
    <div className={cn(
      "rounded-xl p-6  transition-all duration-300 hover:shadow-md",
      type === 'included' 
        ? "bg-gradient-to-br from-midnight-blue/95 to-ocean-blue/95 text-white border border-ocean-blue/20" 
        : "bg-light-gray text-gray-800 border border-gray-200",
      className
    )}>
      <h3 className={cn(
        "text-lg font-medium mb-4 pb-2 border-b",
        type === 'included' ? "text-white border-white/20" : "text-gray-700 border-gray-200" 
      )}>{title}</h3>
      <div className="space-y-3">
        {services.map((service, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={cn(
              "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
              type === 'included' 
                ? "bg-white/20 text-white" 
                : "bg-gray-200 text-gray-600"
            )}>
              {type === 'included' ? (
                <Check className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
            </div>
            <span className={type === 'included' ? "text-white/90" : "text-gray-700"}>{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedServicesList;