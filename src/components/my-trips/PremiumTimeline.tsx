import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Hotel, Compass, ArrowRight } from "lucide-react";
import { Waypoint } from "@/lib/types/waypoint";

// Update the interface to accept a ref
interface PremiumTimelineProps {
  waypoints: Waypoint[];
  activeWaypointIndex: number;
  onWaypointClick: (index: number) => void;
  startLocation?: string;
  endLocation?: string;
  totalStops?: number;
  budget?: number;
  currency?: string;
  timelineRef?: React.RefObject<HTMLDivElement>;
  scrollProgress?: number;
  
}

// Add a simple solution to prevent auto-scrolling when a waypoint is clicked

export default function PremiumTimeline({
  waypoints,
  activeWaypointIndex,
  onWaypointClick,
  scrollProgress,
  
  timelineRef: externalTimelineRef
}: PremiumTimelineProps) {
  
  const [progressBarTop, setProgressBarTop] = useState(0);
  const [progressBarHeight, setProgressBarHeight] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [hoveredWaypointIndex, setHoveredWaypointIndex] = useState<number | null>(null);
  const [clickedWaypointIndex, setClickedWaypointIndex] = useState<number | undefined>(undefined);
  const internalTimelineRef = useRef<HTMLDivElement>(null);
  // Use the externally provided ref or fall back to internal one
  const timelineRef = externalTimelineRef || internalTimelineRef;
  const waypointRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  
  // Find line ~41 and replace the handleWaypointClick function
// Find line ~41 and replace the handleWaypointClick function
const handleWaypointClick = (index: number) => {
  setClickedWaypointIndex(index);  
  onWaypointClick(index);
  
};
  
  // Original coloring
 

  const getWaypointIcon = (type: string) => {
    const iconProps = { className: "w-4 h-4 text-white" };
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

  const getWaypointType = (type: string) => {
    switch (type) {
      case "start":
        return "Starting Point";
      case "attraction":
        return "Attraction";
      case "stop":
        return "Overnight Stop";
      case "end":
        return "Final Destination";
      default:
        return "Waypoint";
    }
  };
  
  // STEP 3: useEffect hooks
  // Initialize the refs array when waypoints change
  useEffect(() => {
    waypointRefs.current = waypointRefs.current.slice(0, waypoints.length);
  }, [waypoints.length]);
  
  

  
useEffect(() => {
  const updateProgressBar = () => {
    if (!timelineRef.current || waypointRefs.current.length < 2) return;
    
    const allWaypoints = waypointRefs.current.filter(Boolean);
    if (allWaypoints.length < 2) return;
    
    const firstWaypoint = allWaypoints[0];
    const activeWaypoint = allWaypoints[activeWaypointIndex];
    
    if (firstWaypoint && activeWaypoint) {
      const firstTop = firstWaypoint.offsetTop + 16;
      const activeTop = activeWaypoint.offsetTop + 16;
      
      setProgressBarTop(firstTop);
      setProgressBarHeight(activeWaypointIndex === 0 ? 0 : activeTop - firstTop);
    }
  };

  // Defer measurement until after DOM updates
  const timer = setTimeout(updateProgressBar, 50);
  window.addEventListener("resize", updateProgressBar);
  return () => {
    clearTimeout(timer);
    window.removeEventListener("resize", updateProgressBar);
  };
}, [activeWaypointIndex]);

  // Dynamically control spacing between waypoints
  const baseSpacing = 8; // default spacing in rem
  const dynamicSpacing = Math.max(2, baseSpacing - 0.8 * (waypoints.length - 1));

  return (
    <div ref={timelineRef} className="h-full flex flex-col bg-white p-6 overflow-y-auto overflow-x-hidden custom-scrollbar pb-[170px]">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-100 ">
        <h2 className="text-xl font-bold text-midnight-blue ">Journey Timeline</h2>
        <p className="text-sm text-gray-500 mt-1">Track your adventure</p>
      </div>

      {/* Timeline container */}
      <div className="relative pl-12">
        {/* Thicker vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />

        {/* Progress line - positioned dynamically based on DOM measurements */}
        <div 
          className="absolute left-6 w-1 bg-ocean-blue rounded-full transition-all duration-300"
          style={{ 
            top: `${progressBarTop}px`,
            height: `${progressBarHeight}px` 
          }}
        />

        {waypoints.map((waypoint, index) => {
          
          const isActiveByScroll = index === activeWaypointIndex;
          const isActiveByClick = clickedWaypointIndex !== undefined && index === clickedWaypointIndex;
          const isActiveByHover = index === hoveredWaypointIndex;
          const isPassed = index < activeWaypointIndex;

          return (
            <div
              key={waypoint.id}
              ref={el => waypointRefs.current[index] = el}
              style={{ marginBottom: `${index === waypoints.length - 1 ? 0 : dynamicSpacing}rem` }}
              className="relative "
              
            >
              {/* Icon wrapper - using ref-based approach instead of class selector */}
              <div
                className={`
                  absolute -left-[38px] w-8 h-8 rounded-full
                  flex items-center justify-center z-10
                  ${(isActiveByClick || isActiveByHover) ? "shadow-md" : "shadow-sm hover:shadow"}
                  ${isActiveByClick ? "bg-midnight-blue" : "bg-ocean-blue"}
                  transition-all duration-300
                `}
                style={{ top: 0 }}
              >
                {/* Icon content */}
                {getWaypointIcon(waypoint.type)}
              </div>

              {/* Improved Waypoint Button - FIXED POSITIONING */}
              <motion.button
                onClick={() => handleWaypointClick(index)}
                onHoverStart={() => setHoveredWaypointIndex(index)}
                onHoverEnd={() => setHoveredWaypointIndex(null)}
                className={`
                  ml-10 px-4 py-3 rounded-lg w-full text-left
                  transition-all duration-300 
                  relative left-[-30px]
                  ${isActiveByClick || isActiveByHover
                    ? "bg-light-gray/60 shadow-sm" 
                    : isPassed
                      ? "bg-white hover:bg-light-gray/20"
                      : "bg-white hover:bg-light-gray/20"}
                `}
                whileHover={{ x: 3 }}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* Inner content layout */}
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className={`
                      text-base font-semibold mb-1
                      ${isActiveByClick ? "text-midnight-blue" : "text-gray-700"}
                    `}>
                      {waypoint.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-0.5">
                      {getWaypointType(waypoint.type)}
                    </p>
                    
                    {waypoint.hotels && waypoint.hotels.length > 0 && (
                      <div className="mt-1.5 bg-ocean-blue/10 rounded-full px-2 py-0.5 inline-flex items-center">
                        <Hotel className="w-3 h-3 text-ocean-blue mr-1" />
                        <span className="text-xs text-ocean-blue">
                          {waypoint.hotels.length} {waypoint.hotels.length === 1 ? 'hotel' : 'hotels'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {(isActiveByClick || isActiveByHover) && (
                    <ArrowRight className="w-4 h-4 text-ocean-blue" />
                  )}
                </div>
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}