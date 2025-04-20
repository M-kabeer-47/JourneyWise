import React from 'react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-light-gray rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-midnight-blue mb-4">No Trips Found</h2>
      <p className="text-charcoal mb-6">
        It looks like you haven't planned any trips yet. Start your adventure by planning a new trip!
      </p>
      <a href="/plan-trip">
        <button className="px-6 py-3 bg-ocean-blue text-white rounded-lg hover:bg-midnight-blue transition-all">
          Plan a New Trip
        </button>
      </a>
    </div>
  );
};

export default EmptyState;