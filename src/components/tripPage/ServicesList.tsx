
import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Service {
  name: string;
}

interface ServicesListProps {
  title: string;
  services: Service[];
  type: 'included' | 'excluded';
  className?: string;
}

const ServicesList = ({ title, services, type, className }: ServicesListProps) => {
  return (
    <div className={cn(
      "rounded-xl p-5 shadow-sm",
      type === 'included' ? "bg-midnight-blue text-white" : "bg-[#F4A261] text-midnight-blue",
      className
    )}>
      <h3 className={cn(
        "font-medium mb-4",
        type === 'included' ? "text-white" : "text-midnight-blue"
      )}>{title}</h3>
      <ul className="space-y-3">
        {services.map((service, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            {type === 'included' ? (
              <div className="flex-shrink-0 h-5 w-5 bg-white/20 rounded-full flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <div className="flex-shrink-0 h-5 w-5 bg-white/30 rounded-full flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-midnight-blue" />
              </div>
            )}
            <span className={type === 'included' ? "text-white/90" : "text-midnight-blue/90"}>{service.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
