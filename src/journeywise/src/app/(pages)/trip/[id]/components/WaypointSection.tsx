import React from 'react';
import { Waypoint } from '@/lib/types/waypoint';
import { Hotel } from '@/lib/types/hotel';
import HotelCard from './HotelCard';

interface WaypointSectionProps {
  waypoint: Waypoint;
}

const WaypointSection: React.FC<WaypointSectionProps> = ({ waypoint }) => {
  return (
    <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Waypoint header */}
      <div className="p-4 bg-ocean-blue text-white">
        <h2 className="text-xl font-bold">{waypoint.name}</h2>
        <p className="text-sm">{waypoint.description}</p>
      </div>

      {/* Image and description */}
      <div className="p-6">
        {waypoint.imageUrl && (
          <div className="mb-4">
            <img
              src={waypoint.imageUrl}
              alt={waypoint.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Hotels for stops */}
        {waypoint.hotels && waypoint.hotels.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-midnight-blue mb-4">Where to Stay</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {waypoint.hotels.map((hotel: Hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaypointSection;