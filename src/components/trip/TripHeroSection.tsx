"use client"
import { motion } from "framer-motion";
import { ArrowRight, BanknoteIcon, Route, Train } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

interface TripHeroSectionProps {
    trip: any;
    waypoints: any;
    user: any;
}

export default function TripHeroSection({ trip, waypoints, user }: TripHeroSectionProps) {
    return (
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
          {waypoints.length > 0 ? waypoints[0].name : "Starting Point"}
          <ArrowRight className="inline-block mx-4 w-8 h-8 text-accent" />
          {waypoints.length > 0 ? waypoints[waypoints.length - 1].name : "Destination"}
        </h1>

        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          {trip?.description ||
            "Discover amazing attractions and comfortable stops along this carefully curated route"}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-2">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
            <Train className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">
              {trip?.estimatedDistance || 0} km
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
            {/* <MapPin className="w-4 h-4 text-accent" /> */}
            <span className="text-sm font-medium">
              {waypoints.length} Waypoints
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
            <BanknoteIcon className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">
              ${trip?.estimatedBudget || 0}
            </span>
          </div>
        </div>

        {/* Trip author info and Edit button */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Avatar profileImage={user?.avatar} variant="navbar" />

          <span className="text-sm text-blue-100">
            Created by {user?.name || "Unknown"}
          </span>
        </div>

        {/* Edit Trip Button */}
      </motion.div>
    )
}