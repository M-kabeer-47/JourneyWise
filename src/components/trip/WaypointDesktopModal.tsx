"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, Bed, Star, Hotel, MapPin, X } from "lucide-react";
import type { Waypoint } from "@/lib/types/waypoint";
import ImageModal from "@/components/ui/ImageModal";

interface WaypointInfoModalProps {
  waypoint: Waypoint | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function WaypointInfoModal({
  waypoint,
  isOpen,
  onClose,
}: WaypointInfoModalProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  if (!waypoint) return null;

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal - Two Column Layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl min-w-[800px] max-w-6xl h-[50vh] flex overflow-hidden"
            >
              {/* Left Column - Image */}
              <div className="w-1/2 p-6">
                {waypoint.type === "attraction" && waypoint.imageUrl ? (
                  <div className="relative h-full rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={waypoint.imageUrl}
                      alt={waypoint.name}
                      fill
                      className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      priority={false}
                      onClick={() => setIsImageOpen(true)}
                    />
                  </div>
                ) : (
                  <div className="h-full rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      {waypoint.type === "stop" ? (
                        <Bed className="w-16 h-16 mx-auto mb-2 text-gray-400" />
                      ) : (
                        <Camera className="w-16 h-16 mx-auto mb-2 text-gray-400" />
                      )}
                      <p className="text-sm">No image available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Information */}
              <div className="w-1/2 flex flex-col">
                {/* Close Button */}
                <div className="flex justify-end p-4 pb-0">
                  <button
                    onClick={onClose}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col px-6 pb-6 overflow-hidden">
                  {/* Title and Type */}
                  <div className="flex-shrink-0 mb-4">
                    <h3 className="text-2xl font-bold text-midnight-blue font-raleway mb-2">
                      {waypoint.name}
                    </h3>
                    {TypeBadge}
                  </div>

                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {/* Description */}
                    {waypoint.description && (
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {waypoint.description}
                      </div>
                    )}

                    {/* Hotels Section */}
                    {waypoint.type === "stop" &&
                      waypoint.hotels &&
                      waypoint.hotels.length > 0 && (
                        <div className="pb-4">
                          <div className="flex items-center gap-2 mb-4 sticky top-0 bg-white py-2 -mx-2 px-2 border-b border-gray-100">
                            <Bed className="w-4 h-4 text-ocean-blue" />
                            <h4 className="text-sm font-semibold text-gray-800">
                              Recommended Hotels ({waypoint.hotels.length})
                            </h4>
                          </div>

                          <div className="space-y-3">
                            {waypoint.hotels.map((hotel) => (
                              <div
                                key={hotel.id}
                                className="bg-gray-50 border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
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
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Modal */}
          <ImageModal
            isOpen={isImageOpen}
            onClose={() => setIsImageOpen(false)}
            imageUrl={waypoint.imageUrl || ""}
            alt={waypoint.name}
          />
        </>
      )}
    </AnimatePresence>
  );
}
