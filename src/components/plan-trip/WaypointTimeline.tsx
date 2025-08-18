"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Compass,
  Hotel,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import type { Waypoint } from "@/lib/types/waypoint";
import { useEffect, useRef, useState } from "react";
import ImageModal from "../ui/ImageModal";
interface WaypointTimelineProps {
  waypoints: Waypoint[];
  activeIndex: number;
  onWaypointClick: (index: number) => void;
  isLoading?: boolean;
  progress: number;
  showCards?: boolean; // NEW: control internal card rendering
}

// ─── Waypoint Detail Card ────────────────────────────────

// ─── Desktop Horizontal Timeline ────────────────────────────────

interface DesktopHorizontalTimelineProps extends WaypointTimelineProps {
  setIsImageModalOpen: (value: boolean) => void;
  setSelectedWaypoint: (waypoint: Waypoint | null) => void;
  previewUrl: string; // Optional prop for image preview URL
}

const DesktopHorizontalTimeline = ({
  waypoints,
  activeIndex,
  onWaypointClick,
  progress,
  setIsImageModalOpen,
  setSelectedWaypoint,
  showCards = true, // Add this prop
  previewUrl,
}: DesktopHorizontalTimelineProps & { showCards?: boolean }) => {
  const waypointsLength = waypoints.length;

  useEffect(() => {
    console.log(waypoints);
  }, [waypoints]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, []);
  // No need to check window width; decide layout purely by index parity
  const getWaypointIcon = (type: string, isActive: boolean) => {
    const iconProps = {
      className: `w-5 h-5 ${isActive ? "text-white" : "text-ocean-blue"}`,
    };
    switch (type) {
      case "start":
        return <Navigation {...iconProps} />;
      case "attraction":
        return <Compass {...iconProps} />;
      case "stop":
        return <Hotel {...iconProps} />;
      case "end":
        return <MapPin {...iconProps} />;
      default:
        return <MapPin {...iconProps} />;
    }
  };

  return (
    <div className="relative w-full py-16 flex flex-col items-center md:px-[40px] lg:px-[20px] lg:min-h-[200px] md:min-h-[380px] lg:top-[0px] md:top-[-80px]">
      {/* Background line */}
      <div className="absolute top-1/2 left-0 right-0 bg-ocean-blue/30 h-1 w-[96%] md:left-[15px]" />

      {/* Progress line */}
      <motion.div
        className="absolute top-1/2 h-1 bg-ocean-blue"
        style={{
          left: `24px`, // icon radius (48px / 2)
          right: `24px`,
          width: "auto",
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          mass: 0.5,
          restDelta: 0.001,
        }}
      />

      {/* Icon container */}
      <div className="relative flex justify-between items-center w-full lg:top-[35px] md:top-[130px]">
        {waypoints.map((waypoint, index) => {
          const isActive = index === activeIndex;
          // Use index parity to decide card positioning (no window-dependent logic)
          const showAbove = index % 2 === 0;
          const position =
            index === 0
              ? "0%"
              : index === waypointsLength - 1
              ? "100%"
              : `${(index / (waypointsLength - 1)) * 100}%`;

          return (
            <div
              key={waypoint.id}
              className="absolute flex flex-col items-center"
              style={{
                left: position,
                transform: "translateX(-50%)",
              }}
            >
              {/* Icon Button */}
              <button
                onClick={() => onWaypointClick(index)}
                className="z-10 relative w-12 h-12"
              >
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center border-2 border-ocean-blue transition-all duration-300 ${
                    isActive ? "bg-ocean-blue shadow-lg scale-105" : "bg-white"
                  }`}
                >
                  {getWaypointIcon(waypoint.type, isActive)}
                </div>
              </button>

              {/* Detail Card */}
              {showCards ? (
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: showAbove && width > 1024 ? 20 : -20,
                      }}
                      animate={{
                        opacity: 1,
                        y: showAbove && width > 1024 ? -40 : 40,
                      }}
                      exit={{
                        opacity: 0,
                        y: showAbove && width > 1024 ? 20 : -20,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 0.8,
                      }}
                      style={{
                        top:
                          width <= 1024
                            ? "calc(60%)"
                            : showAbove
                            ? "auto"
                            : "calc(60%)",
                        bottom: width > 1024 && showAbove ? "65%" : "auto",
                      }}
                      className={`
                        absolute h-auto bg-white p-4 rounded-lg shadow-lg w-64 max-w-[300px]
                        ${index === 0 ? "left-[10px]" : ""}
                        ${index === waypoints.length - 1 ? "right-[10px]" : ""}
                      `}
                    >
                      {waypoint.imageUrl && (
                        <div className="relative w-full aspect-video mb-2 rounded bg-gray-100 cursor-pointer">
                          <img
                            src={previewUrl}
                            alt={waypoint.name || "Attraction"}
                            className="w-full h-full object-cover"
                            onClick={() => {
                              setSelectedWaypoint(waypoint);
                              setIsImageModalOpen(true);
                            }}
                          />
                        </div>
                      )}
                      <h3 className="text-base font-bold text-midnight-blue mb-1 h-auto">
                        {waypoint.name ||
                          (index === 0
                            ? "Starting Point"
                            : index === waypointsLength - 1
                            ? "Final Destination"
                            : "New Waypoint")}
                      </h3>
                      <p className="text-xs text-charcoal">
                        {waypoint.description || "No description provided."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <h1
                  className={`text-xs text-charcoal font-semibold overflow-visible mt-1 h-0 whitespace-nowrap absolute ${
                    index % 2 == 0 ? "top-12" : "-top-10"
                  }`}
                >
                  {waypoint.name}
                </h1>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Mobile Vertical Timeline ────────────────────────────────

interface MobileVerticalTimelineProps extends WaypointTimelineProps {
  setIsImageModalOpen: (value: boolean) => void;
  setSelectedWaypoint: (waypoint: Waypoint | null) => void;
  selectedWaypoint: Waypoint | null;
}

const MobileVerticalTimeline = ({
  waypoints,
  activeIndex,
  onWaypointClick,
}: MobileVerticalTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progressHeight, setProgressHeight] = useState(0);
  const [progressBarTop, setProgressBarTop] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateProgressBar = () => {
      if (!containerRef.current || !waypoints.length) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const waypointCircles =
        container.querySelectorAll<HTMLElement>(".waypoint-circle");
      if (!waypointCircles.length) return;

      const firstRect = waypointCircles[0].getBoundingClientRect();
      const firstOffset = firstRect.top - rect.top;
      const activeRect = waypointCircles[activeIndex]?.getBoundingClientRect();
      if (!activeRect) return;
      const activeTopRelative = activeRect.top - rect.top;

      setProgressBarTop(firstOffset);
      setProgressHeight(activeTopRelative - firstOffset);
    };

    const observer = new ResizeObserver(updateProgressBar);
    if (containerRef.current) observer.observe(containerRef.current);
    updateProgressBar();

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [activeIndex, waypoints]);

  const getWaypointIcon = (type: string, isActive: boolean) => {
    const iconProps = {
      className: `w-5 h-5 ${isActive ? "text-white" : "text-ocean-blue"}`,
    };
    switch (type) {
      case "start":
        return <Navigation {...iconProps} />;
      case "attraction":
        return <Compass {...iconProps} />;
      case "stop":
        return <Hotel {...iconProps} />;
      case "end":
        return <MapPin {...iconProps} />;
      default:
        return <MapPin {...iconProps} />;
    }
  };

  const handleWaypointClick = (index: number) => {
    onWaypointClick(index);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  

  return (
    <div ref={containerRef} className="relative pl-8 py-4  min-h-[60vh]">
      {/* Vertical line - only between first and last waypoint */}
      <div
        className="absolute left-[52px] w-1 bg-ocean-blue/30"
        style={{
          top: "60px", // Start from first waypoint center
          bottom: "60px", // End at last waypoint center
        }}
      />

      {/* Progress indicator */}
      <motion.div
        className="absolute left-[52px] w-1 bg-ocean-blue"
        style={{ top: progressBarTop, height: progressHeight }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />

      {/* Waypoints with increased spacing */}
      <div className="space-y-16">
        {" "}
        {/* Increased from space-y-6 to space-y-16 */}
        {waypoints.map((waypoint, index) => {
          const isActive = index === activeIndex;

          return (
            <div key={waypoint.id} className="relative">
              <button
                onClick={() => handleWaypointClick(index)}
                className="w-full flex items-start group"
              >
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-ocean-blue transition-colors duration-200 ${
                      isActive ? "bg-ocean-blue" : "bg-white"
                    } waypoint-circle`}
                  >
                    {getWaypointIcon(waypoint.type, isActive)}
                  </div>
                </div>
                <div className="ml-6 flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-lg font-bold ${
                        isActive ? "text-midnight-blue" : "text-charcoal"
                      }`}
                    >
                      {waypoint.name ||
                        (index === 0
                          ? "Starting Point"
                          : index === waypoints.length - 1
                          ? "Final Destination"
                          : "New Waypoint")}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {waypoint.type.charAt(0).toUpperCase() +
                      waypoint.type.slice(1)}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function WaypointTimeline({
  waypoints,
  activeIndex,
  onWaypointClick,
  progress,
  showCards = true, // NEW default: keep old behavior
}: WaypointTimelineProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(
    null
  );
  const [previewUrl, setPreviewUrl] = useState("");
  useEffect(() => {
    if (waypoints[activeIndex]?.imageUrl && waypoints[activeIndex].imageUrl instanceof File) {
      setPreviewUrl(
        URL.createObjectURL(waypoints[activeIndex].imageUrl as File)
      );
    }
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [waypoints[activeIndex]?.imageUrl, activeIndex]);

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <DesktopHorizontalTimeline
          waypoints={waypoints}
          activeIndex={activeIndex}
          onWaypointClick={onWaypointClick}
          progress={progress}
          setIsImageModalOpen={setIsImageModalOpen}
          setSelectedWaypoint={setSelectedWaypoint}
          showCards={showCards} // Pass down the showCards prop
          previewUrl={previewUrl || "defaultPreviewUrl"} // Pass the preview
        />
      </div>
      <div className="block md:hidden">
        <MobileVerticalTimeline
          waypoints={waypoints}
          activeIndex={activeIndex}
          onWaypointClick={onWaypointClick}
          setSelectedWaypoint={setSelectedWaypoint}
          setIsImageModalOpen={setIsImageModalOpen}
          selectedWaypoint={selectedWaypoint}
          progress={progress}
          showCards={showCards} // Pass down the showCards prop
        />
      </div>

      {/* Shared Image Modal */}
      {isImageModalOpen && selectedWaypoint && (
        <ImageModal
          isOpen={isImageModalOpen}
          imageUrl={previewUrl}
          onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </div>
  );
}
