import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

interface LocationStepProps {
  startLocation: string
  endLocation: string
  onStartLocationChange: (value: string) => void
  onEndLocationChange: (value: string) => void
}

export const LocationStep = ({
  startLocation,
  endLocation,
  onStartLocationChange,
  onEndLocationChange,
}: LocationStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-midnight-blue">Set Your Journey Points</h2>
        <p className="text-gray-500 mt-2">
          Enter your starting point and final destination to begin planning your trip.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">Start Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={startLocation}
              onChange={(e) => onStartLocationChange(e.target.value)}
              className="w-full pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
              placeholder="Enter your starting point"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">End Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={endLocation}
              onChange={(e) => onEndLocationChange(e.target.value)}
              className="w-full pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
              placeholder="Enter your final destination"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}