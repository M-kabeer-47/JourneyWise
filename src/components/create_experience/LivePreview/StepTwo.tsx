"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Clock, MapPin } from "lucide-react"

type Destination = {
  id: string
  day: number
  name: string
  activities: Activity[]
}

type Activity = {
  id: string
  name: string
  time?: string
  spot?: string
}

interface StepTwoProps {
  destinations: Destination[]
  itemVariants: any
}

export default function StepTwo({ destinations = [], itemVariants }: StepTwoProps) {
  const defaultDestination = {
    id: "1",
    day: 1,
    name: "Start",
    activities: [{ id: "1", name: "Departure" }],
  }

  const allDestinations = destinations.length > 0 ? destinations : [defaultDestination]

  return (
    <div className="space-y-6 md:space-y-8">
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-semibold text-midnight-blue">Itinerary Overview</h3>

        <div className="relative">
          {/* Timeline visualization */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-ocean-blue/20" />

          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {allDestinations.map((destination: Destination, index: number) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative pl-16"
                >
                  {/* Destination dot */}
                  <div className="absolute left-4 top-0 w-4 h-4 rounded-full bg-ocean-blue shadow-lg shadow-ocean-blue/20" />

                  {/* Destination content */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-midnight-blue">Day {destination.day}</h4>
                        <span className="text-sm font-medium text-ocean-blue">{destination.name || "TBD"}</span>
                      </div>

                      <div className="space-y-3">
                        {destination.activities.map((activity: Activity) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-4 p-3 rounded-lg bg-gray-50"
                          >
                            <div className="flex-1 space-y-1">
                              <h5 className="font-medium text-charcoal">{activity.name || "New Activity"}</h5>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                {(activity.time || activity.name === "New Activity") && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{activity.time || "Set time"}</span>
                                  </div>
                                )}
                                {(activity.spot || activity.name === "New Activity") && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{activity.spot || "Set location"}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {destination.activities.length === 0 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-4 p-3 rounded-lg bg-gray-50"
                          >
                            <div className="flex-1 space-y-1">
                              <h5 className="font-medium text-charcoal">New Activity</h5>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>Set time</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>Set location</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

