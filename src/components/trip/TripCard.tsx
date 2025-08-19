import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Users, BanknoteIcon, Route, Calendar, MoreVertical, Edit, Trash2, Share2 } from 'lucide-react';

interface Trip {
  id: string;
  userID: string;
  startPoint: string;
  endPoint: string;
  estimatedBudget: number;
  numOfPeople: number;
  estimatedDistance: number;
  currency?: string;
  waypoints: any; // JSON
  createdAt: string;
  updatedAt: string;
}

interface TripCardProps {
  trip: Trip;
  showActions?: boolean;
  onEdit?: (trip: Trip) => void;
  onDelete?: (tripId: string) => void;
  onShare?: (trip: Trip) => void;
}

function getFirstImageFromWaypoints(waypoints: any): string | null {
  try {
    const parsed = typeof waypoints === 'string' ? JSON.parse(waypoints) : waypoints;
    if (Array.isArray(parsed)) {
      for (const waypoint of parsed) {
        if (waypoint?.imageUrl) {
          return waypoint.imageUrl;
        }
      }
    }
  } catch (error) {
    console.error('Error parsing waypoints:', error);
  }
  return null;
}

export default function TripCard({ 
  trip, 
  showActions = true,
  onEdit,
  onDelete,
  onShare 
}: TripCardProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = React.useState(false);
  
  const coverImage = useMemo(() => 
    getFirstImageFromWaypoints(trip.waypoints), 
    [trip.waypoints]
  );

  const handleCardClick = () => {
    router.push(`/trip/${trip.id}`);
  };

  const handleMenuAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    
    switch (action) {
      case 'edit':
        onEdit?.(trip);
        break;
      case 'delete':
        onDelete?.(trip.id);
        break;
      case 'share':
        onShare?.(trip);
        break;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 relative"
      onClick={handleCardClick}
    >
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${trip.startPoint} to ${trip.endPoint}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-midnight-blue/10 to-ocean-blue/20">
            <Route className="w-12 h-12 text-ocean-blue/50" />
          </div>
        )}
        
        {/* Distance Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-midnight-blue">
            {trip.estimatedDistance} km
          </span>
        </div>

        {/* Actions Menu */}
        {showActions && (
          <div className="absolute top-3 right-3">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
              >
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>

              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 py-1 min-w-[140px] z-10"
                >
                  <button
                    onClick={(e) => handleMenuAction('edit', e)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Trip
                  </button>
                  <button
                    onClick={(e) => handleMenuAction('share', e)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={(e) => handleMenuAction('delete', e)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Route */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2 text-midnight-blue">
            <MapPin className="w-4 h-4 text-ocean-blue" />
            <span className="font-bold text-lg">
              {trip.startPoint}
            </span>
          </div>
          <div className="flex-1 border-t border-dashed border-gray-300 mx-2" />
          <div className="text-midnight-blue font-bold text-lg">
            {trip.endPoint}
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4 text-ocean-blue" />
            <span className="text-sm">
              {trip.numOfPeople} {trip.numOfPeople === 1 ? 'Person' : 'People'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <BanknoteIcon className="w-4 h-4 text-ocean-blue" />
            <span className="text-sm font-semibold">
              ${trip.estimatedBudget.toLocaleString()} {trip.currency || 'USD'}
            </span>
          </div>
        </div>

        {/* Date & Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>
              Created {new Date(trip.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-green-600 font-medium">Active</span>
          </div>
        </div>

        {/* Hover Effect Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-ocean-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">View Trip Details</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Route className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(false);
          }}
        />
      )}
    </motion.div>
  );
}