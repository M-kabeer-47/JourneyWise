"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Bed, Bookmark, BookmarkCheck, Star } from "lucide-react";
import type { Waypoint } from "@/lib/types/waypoint";

interface WaypointInfoCardProps {
  waypoint: Waypoint;
}

export default function WaypointInfoCard({ waypoint }: WaypointInfoCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showHotels, setShowHotels] = useState(false);

  const truncate = (text?: string, max = 160) =>
    !text ? "" : text.length <= max ? text : text.slice(0, max).trim() + "...";

  const TypeBadge = (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-ocean-blue/10 text-ocean-blue rounded-full text-xs font-medium">
      {waypoint.type === "attraction" ? (
        <Camera className="w-4 h-4" />
      ) : waypoint.type === "stop" ? (
        <Bed className="w-4 h-4" />
      ) : null}
      <span className="capitalize">{waypoint.type}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean-blue/20"
    >
      {/* Header */}
      {waypoint.type === "attraction" && waypoint.imageUrl ? (
        <div className="relative h-64 overflow-hidden">
          <Image
            src={waypoint.imageUrl}
            alt={waypoint.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            {TypeBadge}
            <button
              onClick={() => setIsSaved((s) => !s)}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
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
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50">
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

      {/* Body */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-midnight-blue transition-colors duration-200 font-raleway">
          {waypoint.name}
        </h3>
        {waypoint.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {truncate(waypoint.description)}
          </p>
        )}

        {/* Hotels (stop only) */}
        {waypoint.type === "stop" && waypoint.hotels && waypoint.hotels.length > 0 && (
          <div className="mt-5">
            <button
              onClick={() => setShowHotels((s) => !s)}
              className="text-sm font-medium text-ocean-blue hover:text-midnight-blue transition"
            >
              {showHotels ? "Hide" : "View"} recommended hotels ({waypoint.hotels.length})
            </button>

            {showHotels && (
              <div className="mt-4 space-y-3">
                {waypoint.hotels.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-ocean-blue/10 flex items-center justify-center">
                        <Star className="w-4 h-4 text-ocean-blue" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{h.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {h.detailsLink && (
                        <a
                          href={h.detailsLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-ocean-blue hover:underline"
                        >
                          Details
                        </a>
                      )}
                      {h.locationLink && (
                        <a
                          href={h.locationLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-ocean-blue hover:underline"
                        >
                          Location
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 capitalize">{waypoint.type}</div>
        </div>
      </div>
    </motion.div>
  );
}