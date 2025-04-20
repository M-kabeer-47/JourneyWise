import React from 'react';
import { Trip } from '@/lib/types/trip';
import { formatCurrency } from '@/lib/utils/format';

interface TripOverviewProps {
  trip: Trip;
}

const TripOverview: React.FC<TripOverviewProps> = ({ trip }) => {
  const startLocation = trip.waypoints.find(w => w.type === 'start')?.name || 'Start';
  const endLocation = trip.waypoints.find(w => w.type === 'end')?.name || 'End';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold text-midnight-blue mb-4">Trip Overview</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-ocean-blue flex items-center justify-center">
            <span className="text-white">🏁</span>
          </div>
          <div>
            <p className="text-xs text-charcoal">Starting Point</p>
            <p className="font-semibold text-midnight-blue">{startLocation}</p>
          </div>
        </div>

        <div className="flex-1 h-[2px] bg-light-gray mx-4 hidden md:block">
          <div className="h-full bg-ocean-blue" style={{ width: '100%' }} />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-midnight-blue flex items-center justify-center">
            <span className="text-white">🏁</span>
          </div>
          <div>
            <p className="text-xs text-charcoal">Final Destination</p>
            <p className="font-semibold text-midnight-blue">{endLocation}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-light-gray p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-midnight-blue">Travelers</span>
          </div>
          <p className="text-lg font-bold text-midnight-blue">
            {trip.numPeople} {trip.numPeople === 1 ? 'Person' : 'People'}
          </p>
        </div>

        <div className="bg-light-gray p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-midnight-blue">Budget</span>
          </div>
          <p className="text-lg font-bold text-midnight-blue">
            {formatCurrency(trip.estimatedBudget, trip.currency)}
          </p>
        </div>

        <div className="bg-light-gray p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-midnight-blue">Created</span>
          </div>
          <p className="text-lg font-bold text-midnight-blue">
            {new Date(trip.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripOverview;