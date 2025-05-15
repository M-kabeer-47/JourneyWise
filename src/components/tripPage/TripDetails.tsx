
import React from 'react';
import { Users, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils'

interface TripDetailsProps {
  memberCount: number;
  price: string;
  className?: string;
}

const TripDetails = ({ memberCount, price, className }: TripDetailsProps) => {
  return (
    <div className={cn("rounded-xl overflow-hidden bg-white shadow-sm", className)}>
      <div className="grid grid-cols-2 divide-x divide-gray-100">
        <div className="p-4 space-y-1">
          <div className="text-sm text-gray-600 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-ocean-blue" />
            <span>Members</span>
          </div>
          <div className="font-medium">{memberCount}</div>
        </div>
        <div className="p-4 space-y-1">
          <div className="text-sm text-gray-600 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-ocean-blue" />
            <span>Price</span>
          </div>
          <div className="font-medium">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
