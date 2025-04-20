import React from 'react';

const TripFilters = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-bold text-midnight-blue mb-4 md:mb-0">Filter Trips</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <select className="border border-gray-300 rounded-lg p-2">
          <option value="">Select Date</option>
          <option value="last-week">Last Week</option>
          <option value="last-month">Last Month</option>
          <option value="last-year">Last Year</option>
        </select>
        <select className="border border-gray-300 rounded-lg p-2">
          <option value="">Select Budget</option>
          <option value="under-500">Under $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="over-1000">Over $1000</option>
        </select>
        <button className="bg-ocean-blue text-white rounded-lg px-4 py-2 hover:bg-midnight-blue transition-all">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default TripFilters;