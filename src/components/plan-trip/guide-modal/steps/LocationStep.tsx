import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LocationStepData, locationStepSchema } from "@/lib/schemas/trip"

interface LocationStepProps {
  initialData?: Partial<LocationStepData>
  onNext: (data: LocationStepData) => void
}

export const LocationStep = ({ initialData, onNext }: LocationStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LocationStepData>({
    resolver: zodResolver(locationStepSchema),
    defaultValues: {
      startLocation: initialData?.startLocation || "",
      endLocation: initialData?.endLocation || "",
    }
  })

  const onSubmit = (data: LocationStepData) => {
    onNext(data)
  }

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
        <p className="text-gray-500 text-sm mt-2">
          Enter your starting point and final destination to begin planning your trip.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="location-form">
        <div className="space-y-2">
          <label className="block text-sm  text-charcoal">Start Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              {...register("startLocation")}
              className="w-full pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
              placeholder="Enter your starting point"
            />
          </div>
          {errors.startLocation && (
            <p className="text-red-500 text-xs">{errors.startLocation.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-charcoal">End Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              {...register("endLocation")}
              className="w-full pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
              placeholder="Enter your final destination"
            />
          </div>
          {errors.endLocation && (
            <p className="text-red-500 text-xs">{errors.endLocation.message}</p>
          )}
        </div>
      </form>
    </motion.div>
  )
}