"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  Route,
  Clock,
  MapPin,
  DollarSign,
  Train,
  ArrowRight,
  BanknoteIcon,
} from "lucide-react";
import { WaypointTimeline } from "@/components/plan-trip/WaypointTimeline";
import InformationCardsSection from "@/components/trip/InformationCardsSection";
import WaypointMobileModal from "@/components/trip/WaypointMobileModal";
import WaypointDesktopModal from "@/components/trip/WaypointDesktopModal";
import { Waypoint } from "@/lib/types/waypoint";
import useFetchTrip from "@/hooks/trip/useFetchTrip";
import { TripHeroSkeleton } from "@/components/skeletons/TripHeroSkeleton";
import { TripTimelineSkeleton } from "@/components/skeletons/TripTimelineSkeleton";
import { InformationCardsSkeleton } from "@/components/skeletons/InformationCardsSkeleton";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export default function TripDisplayPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;
  const { data, isLoading, isError } = useFetchTrip({ id: tripId });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(
    null
  );
  const { isDesktop } = useIsDesktop();

  // Parse waypoints from the API response
  const waypoints = useMemo(() => {
    if (!data?.trip?.waypoints) return [];

    try {
      // Parse the JSON waypoints data
      const parsedWaypoints =
        typeof data.trip.waypoints === "string"
          ? JSON.parse(data.trip.waypoints)
          : data.trip.waypoints;

      return Array.isArray(parsedWaypoints) ? parsedWaypoints : [];
    } catch (isError) {
      return [];
    }
  }, [data?.trip?.waypoints]);

  const n = waypoints.length;
  const progress = useMemo(
    () => (n > 1 ? activeIndex / (n - 1) : 0),
    [activeIndex, n]
  );

  const handleWaypointClick = (index: number) => {
    setActiveIndex(index);
    setSelectedWaypoint(waypoints[index]);
    setIsModalOpen(true);
  };

  // Handle isError state
  if (isError) {
    router.push("/not-found");
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <TripHeroSkeleton />
        <InformationCardsSkeleton />
        <TripTimelineSkeleton />
      </div>
    );
  }

  // Handle case where data is loaded but trip doesn't exist
  if (!data?.trip) {
    router.push("/not-found");
  }

  const { trip, user } = data;

  return (
    <div className="min-h-screen bg-gray-100 pb-[100px]">
      {/* Hero section */}
      <div className="relative top-[30px] pt-20 pb-12 bg-gradient-to-br from-midnight-blue to-ocean-blue text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Route className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">
                Scenic Route Experience
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {trip.waypoints[0].name}
              <ArrowRight className="inline-block mx-4 w-8 h-8 text-accent" />
              {trip.waypoints[waypoints.length - 1].name}
            </h1>

            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              {trip.description ||
                "Discover amazing attractions and comfortable stops along this carefully curated route"}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-2">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <Train className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  {trip.estimatedDistance} km
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  {waypoints.length} Waypoints
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <BanknoteIcon className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  ${trip.estimatedBudget}
                </span>
              </div>
            </div>

            {/* Trip author info */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-sm text-blue-100">
                Created by {user.name}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <InformationCardsSection
        tripData={{
          numOfPeople: trip.numOfPeople,
          estimatedBudget: trip.estimatedBudget,
          estimatedDistance: trip.estimatedDistance,
        }}
        numberOfWaypoints={waypoints.length}
      />

      {/* Main Content - Full Width Timeline */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-midnight-blue mb-2">
              Route Timeline
            </h2>
            <p className="text-gray-600">
              Click on any waypoint to view detailed information
            </p>
          </div>

          <div className="p-4">
            {waypoints.length > 0 ? (
              <WaypointTimeline
                waypoints={waypoints}
                activeIndex={activeIndex}
                onWaypointClick={handleWaypointClick}
                isLoading={false}
                progress={progress}
                showCards={false}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No waypoints found for this trip
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Waypoint Info Modal */}
      {isDesktop ? (
        <WaypointDesktopModal
          waypoint={selectedWaypoint}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : (
        <WaypointMobileModal
          waypoint={waypoints[activeIndex]}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
