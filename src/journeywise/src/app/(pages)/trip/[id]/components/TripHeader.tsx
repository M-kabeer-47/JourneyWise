import React from 'react';

interface TripHeaderProps {
  title: string;
  startLocation: string;
  endLocation: string;
}

const TripHeader: React.FC<TripHeaderProps> = ({ title, startLocation, endLocation }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h1 className="text-3xl font-bold text-midnight-blue">{title}</h1>
      <div className="mt-2 text-charcoal">
        <p>
          <strong>Starting Point:</strong> {startLocation}
        </p>
        <p>
          <strong>Final Destination:</strong> {endLocation}
        </p>
      </div>
    </div>
  );
};

export default TripHeader;