"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Camera,
  Bed,
  Bookmark,
  BookmarkCheck,
  Star,
  MapPin,
} from "lucide-react";
import type { Waypoint } from "@/lib/types/waypoint";

interface WaypointInfoCardProps {
  waypoint: Waypoint;
}

export default function WaypointInfoCard({ waypoint }: WaypointInfoCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const truncate = (text?: string, max = 160) =>
    !text ? "" : text.length <= max ? text : text.slice(0, max).trim() + "...";

  const TypeBadge = (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/85 text-ocean-blue rounded-full text-xs font-medium">
      {waypoint.type === "attraction" ? (
        <Camera className="w-4 h-4" />
      ) : waypoint.type === "stop" ? (
        <Bed className="w-4 h-4" />
      ) : null}
      <span className="capitalize">{waypoint.type}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Section Heading */}

      {/* Fixed Height Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-500 border border-ocean-blue/20 h-[400px] flex flex-col"
      >
        {/* Header - Fixed Height */}
        <div className="flex-shrink-0">
          {waypoint.type === "attraction" && waypoint.imageUrl ? (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={waypoint.imageUrl}
                alt={waypoint.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Add a dark overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                {/* Make TypeBadge more opaque and contrasted */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/95 backdrop-blur-sm text-ocean-blue rounded-full text-xs font-medium shadow-sm border border-white/20">
                  {waypoint.type === "attraction" ? (
                    <Camera className="w-4 h-4" />
                  ) : waypoint.type === "stop" ? (
                    <Bed className="w-4 h-4" />
                  ) : null}
                  <span className="capitalize">{waypoint.type}</span>
                </div>
                <button
                  onClick={() => setIsSaved((s) => !s)}
                  className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 border border-white/20"
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-4 h-4 text-ocean-blue" />
                  ) : (
                    <Bookmark className="w-4 h-4 text-gray-600 hover:text-ocean-blue" />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 h-20">
              {TypeBadge}
              <button
                onClick={() => setIsSaved((s) => !s)}
                className="p-2 bg-white rounded-full border border-gray-100 hover:shadow-sm transition"
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 text-ocean-blue" />
                ) : (
                  <Bookmark className="w-4 h-4 text-gray-600 hover:text-ocean-blue" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Body - Flexible Height with Scroll */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-midnight-blue transition-colors duration-200 font-raleway flex-shrink-0">
            {waypoint.name}
          </h3>

          {waypoint.description && (
            <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-shrink-0">
              {truncate(waypoint.description, 200)}
            </p>
          )}

          {/* Hotels Section - Scrollable if needed */}
          {waypoint.type === "stop" &&
            waypoint.hotels &&
            waypoint.hotels.length > 0 && (
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-4 flex-shrink-0">
                  <Bed className="w-4 h-4 text-ocean-blue" />
                  <h4 className="text-sm font-semibold text-gray-800">
                    Recommended Hotels ({waypoint.hotels.length})
                  </h4>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {waypoint.hotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-ocean-blue/10 flex items-center justify-center flex-shrink-0">
                            <Star className="w-4 h-4 text-ocean-blue" />
                          </div>
                          <span className="text-sm font-medium text-gray-800 leading-tight">
                            {hotel.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 ml-11">
                        {hotel.detailsLink && (
                          <a
                            href={hotel.detailsLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-ocean-blue/10 text-ocean-blue rounded-full text-xs hover:bg-ocean-blue/20 transition"
                          >
                            <Star className="w-3 h-3" />
                            Details
                          </a>
                        )}
                        {hotel.locationLink && (
                          <a
                            href={hotel.locationLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs hover:bg-green-100 transition"
                          >
                            <MapPin className="w-3 h-3" />
                            Location
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex-shrink-0">
            <div className="text-xs text-gray-500 capitalize">
              {waypoint.type}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
