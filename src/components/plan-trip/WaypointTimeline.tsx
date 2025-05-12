"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Navigation,
  Compass,
  Hotel,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react"
import type { Waypoint } from "@/lib/types/Waypoint"
import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { cn } from "@/utils/shadcn/utils"
import ImageModal from "../ui/ImageModal"
interface WaypointTimelineProps {
  waypoints: Waypoint[]
  activeIndex: number
  onWaypointClick: (index: number) => void
  isLoading?: boolean
  progress: number
}

// ─── Waypoint Detail Card ────────────────────────────────





  

// ─── Desktop Horizontal Timeline ────────────────────────────────

interface DesktopHorizontalTimelineProps extends WaypointTimelineProps {
  setIsImageModalOpen: (value: boolean) => void
  setSelectedWaypoint: (waypoint: Waypoint | null) => void
}


const DesktopHorizontalTimeline = ({
  waypoints,
  activeIndex,
  onWaypointClick,
  progress,
  setIsImageModalOpen,
  setSelectedWaypoint,
}: DesktopHorizontalTimelineProps) => {
  const n = waypoints.length
  useEffect(() => {
    
    console.log(waypoints)
  }, [waypoints])
  const [width,setWidth] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth)
    })
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth)
      })
    }
  }, [])
  // No need to check window width; decide layout purely by index parity
  const getWaypointIcon = (type: string, isActive: boolean) => {
    const iconProps = { className: `w-5 h-5 ${isActive ? "text-white" : "text-ocean-blue"}` }
    switch (type) {
      case "start":
        return <Navigation {...iconProps} />
      case "attraction":
        return <Compass {...iconProps} />
      case "stop":
        return <Hotel {...iconProps} />
      case "end":
        return <MapPin {...iconProps} />
      default:
        return <MapPin {...iconProps} />
    }
  }

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
          const isActive = index === activeIndex
          // Use index parity to decide card positioning (no window-dependent logic)
          const showAbove = index % 2 === 0
          const position =
            index === 0 ? "0%" : index === n - 1 ? "100%" : `${(index / (n - 1)) * 100}%`

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
              <button onClick={() => onWaypointClick(index)} className="z-10 relative w-12 h-12">
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center border-2 border-ocean-blue transition-all duration-300 ${
                    isActive ? "bg-ocean-blue shadow-lg scale-105" : "bg-white"
                  }`}
                >
                  {getWaypointIcon(waypoint.type, isActive)}
                </div>
              </button>

              {/* Detail Card */}
              <AnimatePresence>
                {isActive && (
                <motion.div
                initial={{ opacity: 0, y: showAbove && width > 1024 ? 20 : -20 }}
                animate={{ opacity: 1, y: showAbove && width > 1024 ? -40 : 40 }}
                exit={{ opacity: 0, y: showAbove && width > 1024 ? 20 : -20 }}
                transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
                style={{
                  top: width <= 1024 ? "calc(60%)" : showAbove ? "auto" : "calc(60%)",
                  bottom: width > 1024 && showAbove ? "65%" : "auto",
                }}
                className={`
                  absolute h-auto bg-white p-4 rounded-lg shadow-lg w-64 max-w-[300px]
                  ${index === 0 ? "left-[10px]" : ""}
                  ${index === waypoints.length - 1 ? "right-[10px]" : ""}
                `}
              >
              
                    {waypoint.type === "attraction" && waypoint.imageUrl && (
                      <div className="relative w-full aspect-video mb-2 rounded  bg-gray-100 cursor-pointer">
                        <img
                          src={waypoint.imageUrl}
                          alt={waypoint.name || "Attraction"}
                          className="w-full h-full object-cover"
                          onClick={() => {
                            setSelectedWaypoint(waypoint)
                            setIsImageModalOpen(true)
                          }}
                        />
                      </div>
                    )}
                    <h3 className="text-base font-bold text-midnight-blue mb-1 h-auto">
                      {waypoint.name ||
                        (index === 0
                          ? "Starting Point"
                          : index === n - 1
                          ? "Final Destination"
                          : "New Waypoint")}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {waypoint.description || "No description provided."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Mobile Vertical Timeline ────────────────────────────────

interface MobileVerticalTimelineProps extends WaypointTimelineProps {
  setIsImageModalOpen: (value: boolean) => void
  setSelectedWaypoint: (waypoint: Waypoint | null) => void
  selectedWaypoint: Waypoint | null
}

const MobileVerticalTimeline = ({
  waypoints,
  activeIndex,
  onWaypointClick,
  setSelectedWaypoint,
  setIsImageModalOpen,
  selectedWaypoint,
}: MobileVerticalTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progressHeight, setProgressHeight] = useState(0)
  const [progressBarTop, setProgressBarTop] = useState(0)
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  useEffect(() => {
    const updateProgressBar = () => {
      if (!containerRef.current || !waypoints.length) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const waypointCircles = container.querySelectorAll<HTMLElement>(".waypoint-circle")
      if (!waypointCircles.length) return

      const firstRect = waypointCircles[0].getBoundingClientRect()
      const firstOffset = firstRect.top - rect.top
      const activeRect = waypointCircles[activeIndex]?.getBoundingClientRect()
      if (!activeRect) return
      const activeTopRelative = activeRect.top - rect.top

      setProgressBarTop(firstOffset)
      setProgressHeight(activeTopRelative - firstOffset)
    }

    const observer = new ResizeObserver(updateProgressBar)
    if (containerRef.current) observer.observe(containerRef.current)
    updateProgressBar()

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [activeIndex, waypoints])

  const getWaypointIcon = (type: string, isActive: boolean) => {
    const iconProps = { className: `w-5 h-5 ${isActive ? "text-white" : "text-ocean-blue"}` }
    switch (type) {
      case "start":
        return <Navigation {...iconProps} />
      case "attraction":
        return <Compass {...iconProps} />
      case "stop":
        return <Hotel {...iconProps} />
      case "end":
        return <MapPin {...iconProps} />
      default:
        return <MapPin {...iconProps} />
    }
  }

  const handleWaypointClick = (index: number) => {
    onWaypointClick(index)
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  if (!waypoints.length) return <div>No waypoints available</div>

  return (
    <div ref={containerRef} className="relative pl-8 py-4 min-h-[300px]">
      {/* Vertical line */}
      <div className="absolute left-[52px] top-0 bottom-0 w-1 bg-ocean-blue/30" />
      
      {/* Progress indicator */}
      <motion.div
        className="absolute left-[52px] w-1 bg-ocean-blue"
        style={{ top: progressBarTop, height: progressHeight }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />

      {/* Waypoints */}
      <div className="space-y-6">
        {waypoints.map((waypoint, index) => {
          const isActive = index === activeIndex
          const isExpanded = expandedIndex === index

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
                    <h3 className={`text-lg font-bold ${isActive ? "text-midnight-blue" : "text-gray-800"}`}>
                      {waypoint.name ||
                        (index === 0
                          ? "Starting Point"
                          : index === waypoints.length - 1
                          ? "Final Destination"
                          : "New Waypoint")}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <span className="text-sm text-gray-500">
                    {waypoint.type.charAt(0).toUpperCase() + waypoint.type.slice(1)}
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-16 min-h-auto"
                  >
                    <div className="pt-4 pb-2">
                      {waypoint.type === "attraction" && waypoint.imageUrl && (
                        <button
                          onClick={() => {
                            setIsImageModalOpen(true)
                            setSelectedWaypoint(waypoint)
                          }}
                          className="w-[40%] aspect-[16/9] mb-4 object-contain rounded-full shadow-lg"
                        >
                          <img
                            src={waypoint.imageUrl || "/placeholder.svg"}
                            alt={waypoint.name}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      )}
                      <p className="text-sm text-gray-600 mb-4">
                        {waypoint.description || "Add a description for this waypoint"}
                      </p>
                      {waypoint.type === "stop" && waypoint.hotels && waypoint.hotels.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsHotelModalOpen(true)
                            setSelectedWaypoint(waypoint)
                          }}
                          
                          
                          className="w-full bg-ocean-blue text-white rounded-md px-[10px] py-[5px] text-sm"
                        >
                          View Recommended Hotels
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Hotel Modal */}
      {isHotelModalOpen && selectedWaypoint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end items-center justify-center z-50 px-4">
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
             exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
            className="bg-white rounded-t-xl rounded-xl shadow-lg relative w-full sm:max-w-md max-h-[80vh] flex flex-col"
          >
            <div className="p-4 border-b">
              <button
                onClick={() => setIsHotelModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-lg font-semibold">Recommended Hotels</h3>
              <p className="text-sm text-gray-600">Hotels near {selectedWaypoint.name}</p>
            </div>
            <div className="overflow-y-auto flex-grow p-4">
              {selectedWaypoint.hotels && selectedWaypoint.hotels.length > 0 ? (
                selectedWaypoint.hotels.map((hotel, index) => (
                  <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
                    <h4 className="font-semibold text-lg">{hotel.name}</h4>
                    <div className="mt-2 space-y-2">
                      <a
                        href={hotel.locationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ocean-blue hover:text-pastel-rose flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4" />
                        View Location
                      </a>
                      <a
                        href={hotel.detailsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ocean-blue hover:text-pastel-rose flex items-center gap-2"
                      >
                        <Hotel className="w-4 h-4" />
                        View Details
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hotels available for this location.</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}



export const WaypointTimeline = (props: WaypointTimelineProps) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null)

  return (
    <>
      <div className="hidden md:block">
        <DesktopHorizontalTimeline
          {...props}
          setIsImageModalOpen={setIsImageModalOpen}
          setSelectedWaypoint={setSelectedWaypoint}
        />
      </div>
      <div className="block md:hidden">
        <MobileVerticalTimeline
          {...props}
          selectedWaypoint={selectedWaypoint}
          setIsImageModalOpen={setIsImageModalOpen}
          setSelectedWaypoint={setSelectedWaypoint}
        />
      </div>

      {/* Shared Image Modal */}
      {isImageModalOpen && selectedWaypoint && (
       <ImageModal
        isOpen={isImageModalOpen}
        imageUrl={selectedWaypoint.imageUrl || ""}       
         onClose={() => setIsImageModalOpen(false)}
        />
      )}
    </>
  )
}
