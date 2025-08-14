"use client";
import { useMemo, useState } from "react";
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
import WaypointInfoCard from "@/components/trip/WaypointInfoCard";
import { mockTrip } from "@/lib/constants/trip";

export default function TripDisplayPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const waypoints = mockTrip.waypoints;
  const n = waypoints.length;
  const progress = useMemo(
    () => (n > 1 ? activeIndex / (n - 1) : 0),
    [activeIndex, n]
  );

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Main Content - Improved responsive layout */}
      <div className="px-4 sm:px-6 py-8">
        <div className="">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Timeline Column */}
            <div className="xl:col-span-2 order-2 xl:order-1">
              <div className="bg-white overflow-hidden">
                <div className="p-4 sm:p-6 ">
                  <h2 className="text-xl sm:text-2xl font-bold text-midnight-blue mb-2">
                    Route Timeline
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Click on any waypoint to view details
                  </p>
                </div>

                <div className="p-2 sm:p-4">
                  <WaypointTimeline
                    waypoints={waypoints}
                    activeIndex={activeIndex}
                    onWaypointClick={setActiveIndex}
                    isLoading={false}
                    progress={progress}
                    showCards={false}
                  />
                </div>
              </div>
            </div>

            {/* Info Card Column */}
            <div className="xl:col-span-1 order-1 xl:order-2">
              <div className="sticky top-6">
                <div key={activeIndex}>
                  <WaypointInfoCard waypoint={waypoints[activeIndex]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
