"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Bed, Star, Hotel, MapPin, Eye } from "lucide-react";
import type { Waypoint } from "@/lib/types/waypoint";
import ImageModal from "@/components/ui/ImageModal";

interface WaypointInfoCardProps {
  waypoint: Waypoint;
}

export default function WaypointInfoCard({ waypoint }: WaypointInfoCardProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const truncate = (text?: string, max = 200) =>
    !text ? "" : text.length <= max ? text : text.slice(0, max).trim() + "...";

  const TypeBadge = (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/95 backdrop-blur-sm text-ocean-blue rounded-full text-xs font-medium shadow-sm border border-white/20">
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
      {/* Fixed-height, responsive premium card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean-blue/20 h-[clamp(360px,42vh,460px)] flex flex-col"
      >
        {/* Header */}
        <div className="flex-shrink-0">
          {waypoint.type === "attraction" && waypoint.imageUrl ? (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={waypoint.imageUrl}
                alt={waypoint.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                {TypeBadge}

                {/* View button for attractions (opens modal) */}
                <button
                  onClick={() => setIsImageOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-midnight-blue rounded-full text-xs font-semibold shadow-lg hover:bg-white transition-all duration-200 border border-white/20"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 h-20">
              {TypeBadge}
              {/* No save anywhere; no View for non-attractions */}
              <span className="text-xs text-gray-500" />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-midnight-blue transition-colors duration-200 font-raleway flex-shrink-0">
            {waypoint.name}
          </h3>

          {/* Description: longer text, keep card height stable */}
          {waypoint.description && (
            <div className="relative mb-4">
              {/* Collapsed: line clamp. Expanded: scroll inside fixed max height */}
              <div
                className={
                  isDescExpanded
                    ? "max-h-32 overflow-y-auto pr-1 text-sm text-gray-600 leading-relaxed"
                    : "text-sm text-gray-600 leading-relaxed line-clamp-5"
                }
              >
                {isDescExpanded ? waypoint.description : truncate(waypoint.description, 420)}
              </div>

              {/* Fade for collapsed state */}
              

              {/* Toggle (does not change card height) */}
              {waypoint.description.length > 180 && (
                <button
                  onClick={() => setIsDescExpanded((s) => !s)}
                  className="mt-1 text-xs font-medium text-ocean-blue hover:text-midnight-blue transition"
                >
                  {isDescExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}

          {/* Hotels (stop only) — scrollable list keeps card height stable */}
          {waypoint.type === "stop" && waypoint.hotels && waypoint.hotels.length > 0 && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                <Bed className="w-4 h-4 text-ocean-blue" />
                <h4 className="text-sm font-semibold text-gray-800">
                  Recommended Hotels ({waypoint.hotels.length})
                </h4>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {waypoint.hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
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
                          className="inline-flex items-center gap-1 px-3 py-1 bg-midnight-blue/5 text-midnight-blue rounded-full text-xs hover:bg-midnight-blue/10 transition"
                        >
                          <Hotel className="w-3 h-3" />
                          Details
                        </a>
                      )}
                      {hotel.locationLink && (
                        <a
                          href={hotel.locationLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-ocean-blue/5 text-ocean-blue rounded-full text-xs hover:bg-ocean-blue/10 transition"
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
            <div className="text-xs text-gray-500 capitalize">{waypoint.type}</div>
          </div>
        </div>
      </motion.div>

      {/* Image Modal (attraction only) */}
      <ImageModal
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen(false)}
        imageUrl={waypoint.imageUrl || ""}
        alt={waypoint.name}
      />
    </div>
  );
}
