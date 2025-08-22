import React from "react";
import { motion } from "framer-motion";
import { MapIcon, Plus } from "lucide-react";
import TripCard from "@/components/trip/TripCard";
import NoData from "./NoData";

interface TripsTabProps {
  trips: any[];
}

export default function TripsTab({ trips }: TripsTabProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-[800] text-midnight-blue mb-2 font-raleway">
            Trips
          </h2>
          <p className="text-charcoal sm:text-sm text-xs">
            Share your travel experiences and insights
          </p>
        </div>
        <button className="relative sm:text-sm text-xs flex items-center gap-2 px-3 w-[110px] sm:w-[120px] py-2 group  bg-midnight-blue text-white rounded-md hover:shadow-lg transition-all">
          Plan a trip
          <MapIcon className="absolute sm:w-5 sm:h-5 h-4 w-4 right-3 " />
        </button>
      </div>

      {/* Sub-tabs */}

      {trips.length === 0 ? (
        <NoData
          title="No Trips Yet"
          description="Share your knowledge to guide fellow travelers."
          icon={<MapIcon className="sm:w-12 sm:h-12 w-10 h-10 text-midnight-blue" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <TripCard trip={trip} isPersonal={true} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
