"use client";
import { useState, useMemo } from "react";
import { WaypointTimeline } from "@/components/plan-trip/WaypointTimeline";
import WaypointDetailsModal from "@/components/trip/WaypointMobileModal";
import WaypointInfoModal from "@/components/trip/WaypointDesktopModal";
import { Waypoint } from "@/lib/types/waypoint";
import { useIsDesktop } from "@/hooks/useIsDesktop";

interface TripInteractiveProps {
  waypoints: Waypoint[];
}

export  function TripInteractive({ waypoints }: TripInteractiveProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null);
  const { isDesktop } = useIsDesktop();

  const n = waypoints.length;
  const progress = useMemo(
    () => (n > 1 ? activeIndex / (n - 1) : 0),
    [activeIndex, n]
  );

  const handleWaypointClick = (index: number) => {
    setActiveIndex(index);
    setSelectedWaypoint(waypoints[index]);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Main Content - Full Width Timeline */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-midnight-blue mb-2">
              Route Timeline
            </h2>
            <p className="text-gray-600">
              Click on any waypoint to view detailed information
            </p>
          </div>

          <div className="p-4">
            {waypoints.length > 0 ? (
              <WaypointTimeline
                waypoints={waypoints}
                activeIndex={activeIndex}
                onWaypointClick={handleWaypointClick}
                isLoading={false}
                progress={progress}
                showCards={false}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No waypoints found for this trip
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Waypoint Info Modal */}
      {isDesktop ? (
        <WaypointInfoModal
          waypoint={selectedWaypoint}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : (
        <WaypointDetailsModal
          waypoint={waypoints[activeIndex]}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
