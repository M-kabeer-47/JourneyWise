
import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationInfoProps {
  city: string;
  country: string;
  duration: string;
  className?: string;
}

const LocationInfo = ({ city, country, duration, className }: LocationInfoProps) => {
  return (
    <div className={cn("text-sm space-y-1", className)}>
      <div className="flex items-center gap-1.5 text-gray-700">
        <MapPin className="w-4 h-4 text-ocean-blue" />
        <span>{city}, {country}</span>
      </div>
      <div className="flex items-center gap-1.5 text-gray-700">
        <Clock className="w-4 h-4 text-ocean-blue" />
        <span>{duration}</span>
      </div>
    </div>
  );
};

export default LocationInfo;
