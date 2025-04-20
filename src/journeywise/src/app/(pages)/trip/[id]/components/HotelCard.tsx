import React from 'react';
import { Hotel } from '@/lib/types/hotel';
import { MapPin, ExternalLink } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="bg-light-gray p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h4 className="font-semibold text-midnight-blue mb-3">{hotel.name}</h4>
      <div className="flex flex-wrap gap-2">
        {hotel.detailsLink && (
          <a
            href={hotel.detailsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-ocean-blue/10 text-ocean-blue rounded-full text-xs font-medium hover:bg-ocean-blue/15 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Hotel Details
          </a>
        )}
        {hotel.locationLink && (
          <a
            href={hotel.locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-ocean-blue/10 text-ocean-blue rounded-full text-xs font-medium hover:bg-ocean-blue/15 transition-colors"
          >
            <MapPin className="w-3 h-3" />
            View Location
          </a>
        )}
      </div>
    </div>
  );
};

export default HotelCard;