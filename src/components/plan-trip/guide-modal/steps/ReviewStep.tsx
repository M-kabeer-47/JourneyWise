import { motion } from "framer-motion"
import { MapPin, Route, Users, Wallet } from "lucide-react"


interface ReviewStepProps {
  startLocation: string
  endLocation: string
  numPeople: number | undefined
  estimatedBudget: number | undefined
  selectedCurrency: any
  estimatedDistance: number | undefined
}

export const ReviewStep = ({
  startLocation,
  endLocation,
  numPeople,
  estimatedBudget,
  selectedCurrency,
  estimatedDistance
}: ReviewStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-midnight-blue">Review Your Trip</h2>
        <p className="text-gray-500 mt-2 sm:text-sm text-xs">
          Confirm your trip details before we create your personalized plan.
        </p>
      </div>
      <div className="relative top-[-10px]">
        <h3 className="font-medium text-charcoal mb-4 ">Trip Summary</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Start Location</p>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-ocean-blue" />
              <p className="text-sm font-medium text-charcoal">{startLocation}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">End Location</p>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-ocean-blue" />
              <p className="text-sm font-medium text-charcoal">{endLocation}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Estimated Distance</p>
            <div className="flex items-center space-x-2">
              <Route className="w-4 h-4 text-ocean-blue" />
              <p className="text-sm font-medium text-charcoal">
                {estimatedDistance ? `${estimatedDistance} km` : "N/A"}
              </p>
            </div>
          <div className="space-y-1 relative top-[20px]">
            <p className="text-sm text-gray-500">Number of People</p>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-ocean-blue" />
              <p className="text-sm font-medium text-charcoal">{numPeople}</p>
            </div>
          </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Budget</p>
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4 text-ocean-blue" />
              <p className="text-sm font-medium text-charcoal">
                {selectedCurrency.symbol} {estimatedBudget && estimatedBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}