import React from 'react';
import { Trip } from '@/lib/types/trip';
import { formatCurrency } from '@/lib/utils/format';
import { MapPin, Calendar } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const startLocation = trip.waypoints.find(w => w.type === 'start')?.name || 'Start';
  const endLocation = trip.waypoints.find(w => w.type === 'end')?.name || 'End';
  const tripDates = `${new Date(trip.createdAt).toLocaleDateString()} - ${new Date(trip.createdAt).toLocaleDateString()}`; // Placeholder for actual date range

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-midnight-blue">{trip.name}</h3>
      <p className="text-sm text-charcoal mb-2">
        <MapPin className="inline w-4 h-4 mr-1" />
        {startLocation} to {endLocation}
      </p>
      <p className="text-sm text-charcoal mb-2">
        <Calendar className="inline w-4 h-4 mr-1" />
        {tripDates}
      </p>
      <p className="text-md font-medium text-midnight-blue">
        Estimated Budget: {formatCurrency(trip.estimatedBudget, trip.currency)}
      </p>
      <p className="text-sm text-charcoal mt-2">
        {trip.waypoints.length} waypoints planned.
      </p>
    </div>
  );
};

export default TripCard;