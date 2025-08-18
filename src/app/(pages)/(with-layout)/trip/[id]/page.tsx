"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Route,
  Clock,
  MapPin,
  DollarSign,
  Train,
  ArrowRight,
} from "lucide-react";
import { WaypointTimeline } from "@/components/plan-trip/WaypointTimeline";
import { mockTrip } from "@/lib/constants/trip";
import InformationCardsSection from "@/components/trip/InformationCardsSection";
import WaypointMobileModal from "@/components/trip/WaypointMobileModal";
import WaypointDesktopModal from "@/components/trip/WaypointDesktopModal";
import { Waypoint } from "@/lib/types/waypoint";
export default function TripDisplayPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const waypoints = mockTrip.waypoints;
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

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero section */}
      <div className="pt-20 pb-12 bg-gradient-to-br from-midnight-blue to-ocean-blue text-white">
        <div className="max-w-6xl mx-auto px-6">
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
              {mockTrip.startPoint}
              <ArrowRight className="inline-block mx-4 w-8 h-8 text-accent" />
              {mockTrip.endPoint}
            </h1>

            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover amazing attractions and comfortable stops along this
              carefully curated route
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-2">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <Train className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  {mockTrip.routeDistance}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  {mockTrip.estimatedDuration}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  {waypoints.length} Waypoints
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                <DollarSign className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  ${mockTrip.estimatedBudget}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <InformationCardsSection
        mockTrip={mockTrip}
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
            <WaypointTimeline
              waypoints={waypoints}
              activeIndex={activeIndex}
              onWaypointClick={handleWaypointClick}
              isLoading={false}
              progress={progress}
              showCards={false}
            />
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
