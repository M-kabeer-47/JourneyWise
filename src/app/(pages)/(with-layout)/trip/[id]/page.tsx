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
      {/* Hero section (unchanged) */}
      <div className="pt-20 pb-16 bg-gradient-to-br from-midnight-blue to-ocean-blue text-white">
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

            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              {mockTrip.startPoint}
              <ArrowRight className="inline-block mx-4 w-12 h-12 text-accent" />
              {mockTrip.endPoint}
            </h1>

            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover amazing attractions and comfortable stops along this
              carefully curated route
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 mb-2">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Train className="w-5 h-5 text-accent" />
                <span className="font-medium">{mockTrip.routeDistance}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-accent" />
                <span className="font-medium">
                  {mockTrip.estimatedDuration}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="font-medium">
                  {waypoints.length} Waypoints
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <DollarSign className="w-5 h-5 text-accent" />
                <span className="font-medium">${mockTrip.estimatedBudget}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline (use plan-trip styles; hide its internal cards) */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <WaypointTimeline
            waypoints={waypoints}
            activeIndex={activeIndex}
            onWaypointClick={setActiveIndex}
            isLoading={false}
            progress={progress}
            showCards={false} // NEW: don't render cards inside timeline
          />
        </div>
      </section>

      {/* Selected waypoint card (single, premium card below the timeline) */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue">
              Selected Waypoint
            </h2>
            <p className="text-gray-600 mt-2">
              Details styled consistently with the app’s Experience cards
            </p>
          </div>

          <WaypointInfoCard waypoint={waypoints[activeIndex]} />
        </div>
      </section>
    </div>
  );
}
