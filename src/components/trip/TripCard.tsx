import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  
  Clock,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Route,
  Bookmark,
  
  Banknote,
  User,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import useSavePost from "@/hooks/savedPosts/useSavePost";

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
  isSaved: boolean;
}

interface TripCardProps {
  trip: Trip;
  isPersonal?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (tripId: string, title: string) => void;
  onSave?: (tripId: string) => void;
  onUnsave?: (tripId: string) => void;
}

function getFirstImageFromWaypoints(waypoints: any): string | null {
  try {
    const parsed =
      typeof waypoints === "string" ? JSON.parse(waypoints) : waypoints;
    if (Array.isArray(parsed)) {
      for (const waypoint of parsed) {
        if (waypoint?.imageUrl) {
          return waypoint.imageUrl;
        }
      }
    }
  } catch (error) {
    console.error("Error parsing waypoints:", error);
  }
  return null;
}

export default function TripCard({
  trip,
  isPersonal = false,
  onView,
  onEdit,
  onDelete,
}: TripCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {savePost,unsavePost} = useSavePost();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const coverImage = useMemo(
    () => getFirstImageFromWaypoints(trip.waypoints),
    [trip.waypoints]
  );

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (trip.isSaved) {
      unsavePost.mutateAsync({savedPostID: trip.id});
      
    } else {
      savePost.mutateAsync({postID: trip.id, userID: trip.userID, type: "trip"});
      
    }
  };

  const getDuration = () => {
    const start = new Date(trip.createdAt);
    const end = new Date(trip.updatedAt);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(1, days);
  };

  const personalDropdownOptions = [
    {
      label: "View",
      icon: Eye,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onView?.(trip.id);
        setIsDropdownOpen(false);
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit?.(trip.id);
        setIsDropdownOpen(false);
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete?.(trip.id, "trip");
        setIsDropdownOpen(false);
      },
      danger: true,
    },
  ];

  return (
    <Link href={`/trip/${trip.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean-blue/20 transform">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={`${trip.waypoints[0].name} to ${
                trip.waypoints[trip.waypoints.length - 1].name
              }`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-midnight-blue/10 to-ocean-blue/20">
              <Route className="w-12 h-12 text-ocean-blue/50" />
            </div>
          )}

          {/* Distance Badge */}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Actions - Personal Mode: Dropdown Menu */}
          {isPersonal && (
            <div className="absolute top-4 right-4" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
              >
                <MoreVertical className="w-4 h-4 text-charcoal" />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  >
                    <div className="py-1">
                      {personalDropdownOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={index}
                            onClick={option.onClick}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                              option.danger
                                ? "text-red-600 hover:bg-red-50"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Actions - Public Mode: Save Button Only */}
          {!isPersonal && (
            <div className="absolute top-4 right-4">
              <button
                onClick={handleSaveToggle}
                className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
              >
                {
                savePost.isLoading || unsavePost.isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) :
                savePost.isError ? (
                  <Bookmark className="w-4 h-4 text-charcoal" />
                ) : unsavePost.isError ? (
                  <Bookmark className="w-4 h-4 text-ocean-blue" fill="currentColor" />
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
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Route */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-[800] text-xl text-charcoal font-raleway">
                {trip.waypoints[0].name}
              </span>
            </div>
            <div className="flex-1 border-t border-dashed border-gray-300 mx-2" />
            <div className="text-charcoal font-[800] text-xl font-raleway">
              {trip.waypoints[trip.waypoints.length - 1].name}
            </div>
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-charcoal">
              <User className="w-4 h-4 text-ocean-blue" />
              <span className="text-xs sm:text-sm">
                {trip.numOfPeople} people
              </span>
            </div>
            <div className="flex items-center gap-2 text-charcoal">
              <Clock className="w-4 h-4 text-ocean-blue" />
              <span className="text-xs sm:text-sm">{getDuration()} days</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal">
              <MapPin className="w-4 h-4 text-ocean-blue" />
              <span className="text-xs sm:text-sm">
                {trip.estimatedDistance} km
              </span>
            </div>
            <div className="flex items-center gap-2 text-charcoal">
              <Banknote className="w-4 h-4 text-ocean-blue" />
              <span className="text-xs sm:text-sm">
                {trip.currency || "USD"} {" "} {trip.estimatedBudget.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Hover Effect Indicator */}
          {!isPersonal && (
            <div className="flex items-center gap-1 text-ocean-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>View trip details</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
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
          )}
        </div>
      </div>
    </Link>
  );
}
