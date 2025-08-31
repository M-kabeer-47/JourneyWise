import { TripData } from "@/lib/schemas/trip";
import { WaypointType } from "@/lib/types/waypoint";
import { motion } from "framer-motion";
import { UseFormSetValue } from "react-hook-form";

const TypeSelector = ({
  activeIndex,
  watchedWaypoint,
  setValue,
  type,
}: {
  activeIndex: number;
  watchedWaypoint: any;
  setValue: UseFormSetValue<TripData>;
  type: WaypointType;
}) => (
  <div className="flex gap-2">
    <motion.button
      layout
      onClick={() => {
        if (
          watchedWaypoint.type === "start" ||
          watchedWaypoint.type === "end"
        ) {
          return;
        } else {
          if (watchedWaypoint.type === "stop") {
            setValue(`waypoints.${activeIndex}.hotels`, []);
          }
          setValue(`waypoints.${activeIndex}.type`, "attraction");
        }
      }}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
        type === "attraction"
          ? "text-white bg-midnight-blue"
          : "text-charcoal hover:text-midnight-blue"
      }`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {type === "attraction" && (
        <motion.div
          layoutId="bubble"
          className="absolute inset-0"
          style={{ borderRadius: 8 }}
          transition={{ type: "slide", duration: 0.1 }}
        />
      )}
      <span className="relative z-10 font-[Open Sans]">Attraction</span>
    </motion.button>
    <motion.button
      layout
      onClick={() => {
        if (
          watchedWaypoint.type === "start" ||
          watchedWaypoint.type === "end"
        ) {
          return;
        } else {
          setValue(`waypoints.${activeIndex}.type`, "stop");
        }
      }}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
        type === "stop"
          ? "text-white bg-midnight-blue"
          : "text-charcoal hover:text-midnight-blue"
      }`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {type === "stop" && (
        <motion.div
          layoutId="bubble"
          className="absolute inset-0 bg-midnight-blue"
          style={{ borderRadius: 8 }}
          transition={{ type: "slide", duration: 0.1 }}
        />
      )}
      <span className="relative z-10">Stop</span>
    </motion.button>
  </div>
);

export default TypeSelector;