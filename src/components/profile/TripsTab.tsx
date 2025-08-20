import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import TripCard from '@/components/trip/TripCard';

interface TripsTabProps {
  trips: any[];
}

export default function TripsTab({ trips }: TripsTabProps) {
  if (trips.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-midnight-blue to-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6">
          <Plus className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-2">No trips yet</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Start planning your first adventure and create unforgettable memories.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white rounded-full hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" />
          Plan Your First Trip
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-midnight-blue">My Trips</h2>
          <p className="text-gray-600">Plan, manage and revisit your journey plans</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white rounded-full hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" />
          New Trip
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: trips.indexOf(trip) * 0.1 }}
          >
            <TripCard trip={trip} isPersonal={true} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}