import { useEffect, useState } from "react"
import { Plus, Minus, Clock, MapPin, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { ExperienceData } from "@/lib/schemas/experience"

interface FormStep2Props {
  formData: ExperienceData
  handleInputChange: (field: keyof ExperienceData, value: any) => void
  errors: Partial<ExperienceData>
  clickedNext: boolean
}

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

export default function FormStep2({ formData, handleInputChange, errors,clickedNext }: FormStep2Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    if (formData.duration && formData.destinations.length < formData.duration) {
      const newDestinations = Array.from({ length: formData.duration }, (_, i) => ({
        id: Math.random().toString(36).substr(2, 9),
        day: i + 1,
        name: `Destination ${i + 1}`,
        activities: [],
      }))
      handleInputChange("destinations", newDestinations)
    }
  }, [formData.duration, handleInputChange])

  const handleFocus = (fieldName: string) => setFocusedField(fieldName)
  const handleBlur = () => setFocusedField(null)

  const updateDestinationName = (id: string, newName: string) => {
    const newDestinations = formData.destinations.map((dest) => (dest.id === id ? { ...dest, name: newName } : dest))
    handleInputChange("destinations", newDestinations)
  }

  const addActivity = (destinationId: string) => {
    const newDestinations = formData.destinations.map((dest: Destination) => {
      if (dest.id === destinationId) {
        return {
          ...dest,
          activities: [
            ...dest.activities,
            {
              id: Math.random().toString(36).substr(2, 9),
              name: "",
            },
          ],
        }
      }
      return dest
    })
    handleInputChange("destinations", newDestinations)
  }

  const removeActivity = (destinationId: string, activityId: string) => {
    const newDestinations = formData.destinations.map((dest: Destination) => {
      if (dest.id === destinationId) {
        return {
          ...dest,
          activities: dest.activities.filter((activity) => activity.id !== activityId),
        }
      }
      return dest
    })
    handleInputChange("destinations", newDestinations)
  }

  const getFieldError = (day: number, activityIndex: number, field: string) => {
    return errors.destinations?.[day - 1]?.activities?.[activityIndex]?.[field as keyof Activity]
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue">Itinerary Builder</h2>
        <p className="mt-2 text-base text-charcoal">Create your day-by-day travel itinerary</p>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {formData.destinations.map((destination: Destination) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-midnight-blue">Day {destination.day}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Destination Name</label>
                  <input
                    type="text"
                    value={destination.name}
                    onChange={(e) => updateDestinationName(destination.id, e.target.value)}
                    onFocus={() => handleFocus(`destinations.${destination.day - 1}.name`)}
                    onBlur={handleBlur}
                    className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                             transition-all duration-200 outline-none
                             ${
                               focusedField === `destinations.${destination.day - 1}.name`
                                 ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                 : "border-gray-200"
                             }`}
                    placeholder="Enter destination name"
                  />
                  {clickedNext && formData.destinations?.[destination.day - 1]?.name === "" && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      Destination name is required
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-charcoal">Activities</label>
                  <AnimatePresence mode="popLayout">
                    {destination.activities.length === 0 && clickedNext && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        At least one activity is required
                      </p>
                    )}
                    

                    {destination.activities.map((activity: Activity, activityIndex: number) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-grow space-y-2">
                          <input
                            type="text"
                            value={activity.name}
                            onChange={(e) => {
                              const newDestinations = formData.destinations.map((dest) =>
                                dest.id === destination.id
                                  ? {
                                      ...dest,
                                      activities: dest.activities.map((act) =>
                                        act.id === activity.id ? { ...act, name: e.target.value } : act,
                                      ),
                                    }
                                  : dest,
                              )
                              handleInputChange("destinations", newDestinations)
                            }}
                            onFocus={() =>
                              handleFocus(`destinations.${destination.day - 1}.activities.${activityIndex}.name`)
                            }
                            onBlur={handleBlur}
                            className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                                     transition-all duration-200 outline-none
                                     ${
                                       focusedField ===
                                       `destinations.${destination.day - 1}.activities.${activityIndex}.name`
                                         ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                         : "border-gray-200"
                                     }`}
                            placeholder="Activity name"
                          />
                          {clickedNext && formData.destinations?.[destination.day - 1]?.activities?.[activityIndex]?.name === "" && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              Activity name is required
                            </p>
                          )}
                          <div className="flex gap-2">
                            <div className="flex-grow relative">
                              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="text"
                                value={activity.time || ""}
                                onChange={(e) => {
                                  const newDestinations = formData.destinations.map((dest) =>
                                    dest.id === destination.id
                                      ? {
                                          ...dest,
                                          activities: dest.activities.map((act) =>
                                            act.id === activity.id ? { ...act, time: e.target.value } : act,
                                          ),
                                        }
                                      : dest,
                                  )
                                  handleInputChange("destinations", newDestinations)
                                }}
                                onFocus={() =>
                                  handleFocus(`destinations.${destination.day - 1}.activities.${activityIndex}.time`)
                                }
                                onBlur={handleBlur}
                                className={`w-full pl-10 pr-4 h-11 rounded-lg border text-charcoal text-sm
                                         transition-all duration-200 outline-none
                                         ${
                                           focusedField ===
                                           `destinations.${destination.day - 1}.activities.${activityIndex}.time`
                                             ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                             : "border-gray-200"
                                         }`}
                                placeholder="Time (optional)"
                              />
                              {getFieldError(destination.day, activityIndex, "time") && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {getFieldError(destination.day, activityIndex, "time")}
                                </p>
                              )}
                            </div>
                            <div className="flex-grow relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="text"
                                value={activity.spot || ""}
                                onChange={(e) => {
                                  const newDestinations = formData.destinations.map((dest) =>
                                    dest.id === destination.id
                                      ? {
                                          ...dest,
                                          activities: dest.activities.map((act) =>
                                            act.id === activity.id ? { ...act, spot: e.target.value } : act,
                                          ),
                                        }
                                      : dest,
                                  )
                                  handleInputChange("destinations", newDestinations)
                                }}
                                onFocus={() =>
                                  handleFocus(`destinations.${destination.day - 1}.activities.${activityIndex}.spot`)
                                }
                                onBlur={handleBlur}
                                className={`w-full pl-10 pr-4 h-11 rounded-lg border text-charcoal text-sm
                                         transition-all duration-200 outline-none
                                         ${
                                           focusedField ===
                                           `destinations.${destination.day - 1}.activities.${activityIndex}.spot`
                                             ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                             : "border-gray-200"
                                         }`}
                                placeholder="Location (optional)"
                              />
                              {getFieldError(destination.day, activityIndex, "spot") && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {getFieldError(destination.day, activityIndex, "spot")}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeActivity(destination.id, activity.id)}
                          className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={() => addActivity(destination.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Add Activity
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

