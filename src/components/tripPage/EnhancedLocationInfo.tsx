
import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedLocationInfoProps {
  city: string;
  country: string;
  duration: string;
  className?: string;
}

const EnhancedLocationInfo = ({ city, country, duration, className }: EnhancedLocationInfoProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-gray-700">
        <div className="w-8 h-8 rounded-full bg-ocean-blue/10 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-ocean-blue" />
        </div>
        <div>
          <div className="text-sm font-medium text-midnight-blue">Location</div>
          <div className="text-sm">{city}, {country}</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-gray-700">
        <div className="w-8 h-8 rounded-full bg-ocean-blue/10 flex items-center justify-center">
          <Clock className="w-4 h-4 text-ocean-blue" />
        </div>
        <div>
          <div className="text-sm font-medium text-midnight-blue">Duration</div>
          <div className="text-sm">{duration}</div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLocationInfo;
