"use client";
import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, Bed, Star, Maximize2 } from "lucide-react";
import type { Waypoint } from "@/lib/types/waypoint";
import ImageModal from "@/components/ui/ImageModal";

interface WaypointDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  waypoint: Waypoint;
}

export default function WaypointDetailsModal({ isOpen, onClose, waypoint }: WaypointDetailsModalProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);
    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110]">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Bottom sheet < md, centered modal on md+ */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="
              absolute bg-white shadow-2xl border border-gray-100 overflow-scroll transform-gpu
              inset-x-0 bottom-0 rounded-t-3xl h-[68vh]     /* mobile: bottom sheet */

              md:inset-auto md:top-1/4  /* center on md+ */
              md:rounded-2xl md:w-full md:max-w-full md:h-[91vh]
            
            "
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.45 }}
          >
            {/* Attraction header image with View (opens ImageModal) */}
            {waypoint.type === "attraction" && waypoint.imageUrl ? (
              <div className="relative h-64 sm:h-72 md:h-80">
                <Image src={waypoint.imageUrl} alt={waypoint.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm text-midnight-blue border border-white/20 shadow">
                  <Camera className="w-4 h-4 text-ocean-blue" />
                  Attraction
                </div>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow hover:bg-white">
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsImageOpen(true)}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-midnight-blue rounded-full text-xs font-semibold shadow border border-white/20 hover:bg-white"
                >
                  <Maximize2 className="w-4 h-4" />
                  View
                </button>
                <div className="absolute bottom-4 left-4 right-28">
                  <h3 className="text-white text-2xl font-bold drop-shadow">{waypoint.name}</h3>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-ocean-blue/10 text-ocean-blue rounded-full text-xs font-medium">
                  {waypoint.type === "stop" ? <Bed className="w-4 h-4" /> : null}
                  <span className="capitalize">{waypoint.type}</span>
                </div>
                <button onClick={onClose} className="p-2 bg-white rounded-full border border-gray-100 hover:shadow-sm">
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Body */}
            <div className="p-5 md:p-6 flex flex-col  pb-[20px]">
              {!(waypoint.type === "attraction" && waypoint.imageUrl) && (
                <h3 className="text-xl font-bold text-midnight-blue mb-2">{waypoint.name}</h3>
              )}

              {waypoint.description && (
                <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-6">
                  {waypoint.description}
                </p>
              )}

              {/* Hotels for stop — MATCH WaypointInfoCard styling (ocean-blue accents, neutral surfaces) */}
              {waypoint.type === "stop" && waypoint.hotels && waypoint.hotels.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
                    <Bed className="w-4 h-4 text-ocean-blue" />
                    Recommended Hotels ({waypoint.hotels.length})
                  </h4>

                  {waypoint.hotels.map((hotel) => (
                    <div key={hotel.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-ocean-blue/10 flex items-center justify-center">
                            <Star className="w-4 h-4 text-ocean-blue" />
                          </div>
                          <span className="text-sm font-medium text-gray-800 leading-tight">{hotel.name}</span>
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
                            Location
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Full-image lightbox for attractions */}
          {waypoint.type === "attraction" && waypoint.imageUrl && (
            <ImageModal
              isOpen={isImageOpen}
              onClose={() => setIsImageOpen(false)}
              imageUrl={waypoint.imageUrl}
              alt={waypoint.name}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
}