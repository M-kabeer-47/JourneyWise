"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Users, Route, Bookmark, Loader2, MoveRight } from "lucide-react";
import { Trip } from "@/lib/types/trip";
import formatDate from "@/utils/functions/formatDate";
import useSavePost from "@/hooks/savedPosts/useSavePost";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "../ui/Toast";

interface TripCardProps {
  trip: Trip;
  isPersonal?: boolean;
  queryKey?: string;
}

export default function TripCard({ trip, isPersonal = false, queryKey = "trips" }: TripCardProps) {
  const {savePost, unsavePost} = useSavePost();
  const user = useAppSelector((state) => state.user.user);
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStartEndPoints = () => {
    if (!trip.waypoints || trip.waypoints.length === 0)
      return { start: "Unknown", end: "Unknown" };

    const sortedWaypoints = [...trip.waypoints].sort(
      (a, b) => a.order - b.order
    );
    return {
      start: sortedWaypoints[0].name,
      end: sortedWaypoints[sortedWaypoints.length - 1].name,
    };
  };
    const handleSaveToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (trip.isSaved) {
        unsavePost.mutateAsync({savedPostID: trip.id, queryKey});
        
      } else {
        if(!user){
          toast.error("Please login to save trip");
          return;
        }
        savePost.mutateAsync({postID: trip.id, userID: user.id, type: "trip", queryKey});
        
      }
    };

  return (
    <motion.div
    
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean-blue/20 transform h-full flex flex-col"
    >
      {/* Header with Route Visualization - Fixed Height */}
      <div className="relative h-64 bg-gradient-to-br from-ocean-blue/10 to-midnight-blue/10 p-4 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/5 to-midnight-blue/5"></div>

        {/* Route Path Visualization */}
        <div className="relative h-full flex items-center justify-center">
          <div className="flex items-center gap-2 max-w-full overflow-hidden">
            {trip.waypoints && trip.waypoints.length > 0 ? (
              trip.waypoints
                .sort((a, b) => a.order - b.order)
                .slice(0, 4)
                .map((waypoint, index, array) => (
                  <React.Fragment key={waypoint.id}>
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-ocean-blue rounded-full mb-1"></div>
                      <span className="text-xs font-medium text-midnight-blue text-center max-w-16 truncate">
                        {waypoint.city}
                      </span>
                    </div>
                    {index < array.length - 1 && index < 3 && (
                      <div className="flex-1 h-0.5 bg-ocean-blue/30 min-w-4 max-w-8"></div>
                    )}
                  </React.Fragment>
                ))
            ) : (
              <div className="text-gray-400 text-sm">No route defined</div>
            )}

            {trip.waypoints && trip.waypoints.length > 4 && (
              <div className="text-xs text-ocean-blue font-medium">
                +{trip.waypoints.length - 4} more
              </div>
            )}
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Top Row: Save Button */}
        {!isPersonal && (
          <div className="absolute top-4 right-4">
            <button
              onClick={handleSaveToggle}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
            >
              {savePost.isLoading || unsavePost.isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-ocean-blue" />
              ) : savePost.isError ? (
                <Bookmark className="w-4 h-4 text-charcoal" />
              ) : unsavePost.isError ? (
                <Bookmark
                  className="w-4 h-4 text-ocean-blue"
                  fill="currentColor"
                />
              ) : trip.isSaved ? (
                <Bookmark
                  className="w-4 h-4 text-ocean-blue"
                  fill="currentColor"
                />
              ) : (
                <Bookmark className="w-4 h-4 text-charcoal" />
              )}
            </button>
          </div>
        )}

        {/* Bottom Left: Creator Info */}
        {trip.user && (
          <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              {trip.user.image ? (
                <img
                  src={trip.user.image}
                  alt={trip.user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-ocean-blue flex items-center justify-center text-white text-sm font-medium">
                  {trip.user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs font-medium text-gray-800">
                {trip.user.name}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Right: View Button */}
      </div>

      {/* Content Section - Flexible Height */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl flex items-center gap-2 font-[800] text-midnight-blue line-clamp-2 mb-3 group-hover:text-midnight-blue transition-colors duration-200 leading-tight font-raleway">
          {trip.waypoints[0].name}

          <MoveRight className="w-[30px] h-[30px]" />
          {trip.waypoints[trip.waypoints.length - 1].name}
        </h3>

        {/* Start and End Points */}

        {/* Spacer to push content to bottom */}
        <div className="flex-grow"></div>

        {/* Meta Info */}
        <div className="flex items-center justify-between w-full text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2 justify-center">
            <Users className="w-4 h-4 mb-1" />
            <span className="font-medium">
              <span className="font-inter">{trip.numOfPeople}</span>{" "}
              {trip.numOfPeople === 1 ? "person" : "people"}
            </span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <MapPin className="w-4 h-4 mb-1" />
            <span className="font-medium font-inter">
              {trip.estimatedDistance.toLocaleString()} km
            </span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Route className="w-4 h-4 mb-1" />
            <span className="font-medium">
              <span className="font-inter">{trip.waypoints?.length || 0}</span>{" "}
              waypoints
            </span>
          </div>
        </div>

        {/* Action Link for non-personal mode */}
        {!isPersonal && (
          <div className="flex justify-end mb-4">
            <Link href={`/trips/${trip.id}`}>
              <div className="flex items-center gap-1 text-ocean-blue text-sm font-medium">
                <span>View Details</span>
                <svg
                  className="w-4 h-4 transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>
        )}

        {/* Budget Row - Always at bottom */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">
              Estimated Budget
            </span>
            <span className="text-2xl font-bold text-midnight-blue font-inter">
              {formatCurrency(trip.estimatedBudget, trip.currency)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
