"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Clock,
  Users,
  Wallet,
  Globe,
  Ruler,
  Plus,
  Share,
  Copy,
  Check,
  MessageCircle,
} from "lucide-react";
import useFetchTrips from "@/hooks/trips/useFetchTrips";
import { Trip } from "@/lib/types/trip";
import Image from "next/image";
import { toast } from "@/components/ui/Toast";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import SkeletonRouteExplorer from "@/components/skeletons/RouteExplorerSection";
// Currency formatter helper
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Distance formatter helper
const formatDistance = (distance: number) => {
  return `${distance.toLocaleString()} km`;
};

export default function RouteExplorer() {
  const { trips, isLoading } = useFetchTrips({ limit: 3 });
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Set the first trip as selected when data loads
  useEffect(() => {
    if (trips && trips.length > 0 && !selectedTrip) {
      setSelectedTrip(trips[0]);
    }
  }, [trips, selectedTrip]);

  // Function to get first and last waypoints
  const getStartEndPoints = (waypoints: any[]) => {
    if (!waypoints || waypoints.length === 0)
      return { start: "Unknown", end: "Unknown" };
    return {
      start: waypoints[0]?.name || "Starting point",
      end: waypoints[waypoints.length - 1]?.name || "Destination",
    };
  };

  // Generate a placeholder image if none exists
  const getTripImage = (trip: Trip) => {
    return (
      trip.thumbnailUrl ||
      `https://source.unsplash.com/featured/?${trip.country},travel`
    );
  };

  // Handle share button click
  const handleShare = () => {
    if (!selectedTrip) return;

    const url = `${window.location.origin}/trip/${selectedTrip.id}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopySuccess(true);
        toast.success("Link copied to clipboard!");

        // Reset success icon after a moment
        setTimeout(() => {
          setCopySuccess(false);
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy link. Please try again.");
      });
  };

  return (
    <section
      id="route-explorer"
      className="py-20 bg-gradient-to-br from-ocean-blue/5 to-midnight-blue/10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
            Route Explorer — Plan from Point A to B
          </h2>
          <p className="text-xl text-charcoal max-w-4xl mx-auto font-geist">
            Discover travel itineraries with optimized waypoints created by
            fellow travelers
          </p>
        </motion.div>

        {isLoading ? (
          // Skeleton loading state
          <SkeletonRouteExplorer />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Trip Cards */}
            <div className="lg:col-span-1 space-y-4">
              {trips && trips.length > 0 ? (
                trips.map((trip, index) => {
                  const { start, end } = getStartEndPoints(trip.waypoints);
                  const isSelected = selectedTrip?.id === trip.id;

                  return (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedTrip(trip)}
                      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "bg-midnight-blue text-white shadow-lg"
                          : "bg-white hover:shadow-md border border-gray-100"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3
                            className={`font-bold text-lg mb-2 font-raleway ${
                              isSelected ? "text-white" : "text-midnight-blue"
                            }`}
                          >
                            {trip.country} Journey
                          </h3>
                          <div
                            className={`flex items-center gap-2 text-sm mb-2 ${
                              isSelected ? "text-gray-200" : "text-charcoal"
                            }`}
                          >
                            <Navigation size={14} />
                            {start} → {end}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1">
                            <Globe
                              size={14}
                              className={
                                isSelected ? "text-gray-200" : "text-ocean-blue"
                              }
                            />
                            <span
                              className={`text-sm font-medium ${
                                isSelected ? "text-gray-200" : "text-ocean-blue"
                              }`}
                            >
                              {trip.country}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-4 text-sm mb-4 ${
                          isSelected ? "text-gray-200" : "text-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {trip.estimatedDistance / 100} hours
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {trip.numOfPeople} people
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div
                          className={`text-sm font-medium ${
                            isSelected ? "text-white" : "text-charcoal"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <Wallet size={14} />
                            {formatCurrency(
                              trip.estimatedBudget,
                              trip.currency
                            )}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            className={`flex items-center gap-1 text-sm ${
                              isSelected ? "text-gray-200" : "text-gray-600"
                            }`}
                          >
                            <Ruler size={14} />
                            {formatDistance(trip.estimatedDistance)}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-8 bg-white rounded-2xl">
                  <p className="text-gray-500">No trips found</p>
                </div>
              )}

              {/* Create Route Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                onClick={() => setShowCreateModal(true)}
                className="w-full p-6 border-2 border-dashed border-ocean-blue rounded-2xl text-ocean-blue hover:bg-ocean-blue/5 transition-colors flex items-center justify-center gap-3 font-semibold"
              >
                <Plus size={20} />
                Create Your Route
              </motion.button>
            </div>

            {/* Interactive Map/Trip Details */}
            <div className="lg:col-span-2">
              {selectedTrip ? (
                <motion.div
                  key={selectedTrip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
                >
                  {/* Trip Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-midnight-blue mb-2 font-raleway">
                          {selectedTrip.country} Journey
                        </h3>
                        <p className="text-charcoal font-geist">
                          A journey through {selectedTrip.country} with{" "}
                          {selectedTrip.waypoints.length} stops and a budget of{" "}
                          {formatCurrency(
                            selectedTrip.estimatedBudget,
                            selectedTrip.currency
                          )}
                        </p>
                      </div>
                      <div className="flex gap-2 relative">
                        {/* Using Radix UI Popover with hover trigger */}
                        <Popover open={isHovering} onOpenChange={setIsHovering}>
                          <PopoverTrigger asChild>
                            <button
                              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                              onMouseEnter={() => setIsHovering(true)}
                              onMouseLeave={() => setIsHovering(false)}
                            >
                              <Share size={18} className="text-gray-600" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0"
                            align="end"
                            sideOffset={5}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                          >
                            <button
                              onClick={handleShare}
                              className="w-full flex items-center justify-between gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <span>Copy link</span>
                              {copySuccess ? (
                                <Check size={16} className="text-green-500" />
                              ) : (
                                <Copy size={16} />
                              )}
                            </button>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="px-3 py-1 bg-ocean-blue/10 rounded-full flex items-center gap-1 text-midnight-blue">
                        <Users size={14} />
                        {selectedTrip.numOfPeople} travelers
                      </div>
                      <div className="px-3 py-1 bg-ocean-blue/10 rounded-full flex items-center gap-1 text-midnight-blue">
                        <Ruler size={14} />
                        {formatDistance(selectedTrip.estimatedDistance)}
                      </div>
                      <div className="px-3 py-1 bg-ocean-blue/10 rounded-full flex items-center gap-1 text-midnight-blue">
                        <Wallet size={14} />
                        {formatCurrency(
                          selectedTrip.estimatedBudget,
                          selectedTrip.currency
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Trip Thumbnail or Map */}
                  <div className="relative h-64 overflow-hidden">
                    {selectedTrip.thumbnailUrl ? (
                      <Image
                        src={getTripImage(selectedTrip)}
                        alt={`${selectedTrip.country} journey`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="relative h-64 bg-gradient-to-br from-ocean-blue/10 to-midnight-blue/10 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 text-ocean-blue mx-auto mb-4" />
                          <p className="text-charcoal font-medium">
                            {selectedTrip.country} Journey
                          </p>
                          <p className="text-sm text-gray-600">
                            {getStartEndPoints(selectedTrip.waypoints).start} →{" "}
                            {getStartEndPoints(selectedTrip.waypoints).end}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Waypoints */}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-midnight-blue mb-4 font-raleway">
                      Journey Waypoints
                    </h4>

                    <div className="space-y-4">
                      {selectedTrip.waypoints.map((waypoint, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="w-9 h-8 bg-midnight-blue rounded-full flex items-center justify-center text-white font-medium">
                            {index + 1}
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <h5 className="font-semibold text-charcoal">
                              {waypoint.name}
                            </h5>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="px-2 py-1 rounded-md text-xs font-medium bg-ocean-blue/10 text-midnight-blue w-[80px] flex items-center justify-center">
                                {waypoint.type || "Stop"}
                              </span>
                              {waypoint.duration && (
                                <span className="text-sm text-gray-600 flex items-center gap-1">
                                  <Clock size={12} />
                                  {waypoint.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6">
                      <button className="flex-1 bg-midnight-blue text-white py-3 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full flex items-center justify-center">
                  <p className="text-gray-500">Select a trip to see details</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create Route Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full"
            >
              <h3 className="text-2xl font-bold text-midnight-blue mb-6 font-raleway">
                Create Your Route
              </h3>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Italy, Japan, Canada..."
                      className="p-4 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of People
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g., 2"
                      className="p-4 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Budget
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Estimated budget amount"
                      className="p-4 pl-8 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add Waypoints
                  </label>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="border-b border-gray-100 pb-3 mb-3">
                      <input
                        type="text"
                        placeholder="Waypoint name"
                        className="p-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                      />
                    </div>
                    <button className="w-full text-sm text-ocean-blue flex items-center justify-center gap-1">
                      <Plus size={16} />
                      Add another waypoint
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-midnight-blue text-white p-4 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors">
                  Create Route
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

// Skeleton loading component
