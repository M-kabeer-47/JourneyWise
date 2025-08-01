import { Plus, Trash, Clock, MapPin, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TimeInput from "../components/TimeInput";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { stepTwoSchema } from "@/lib/schemas/experience";
import { z } from "zod";
import { useState } from "react";

type StepTwoType = z.infer<typeof stepTwoSchema>;
interface DestinationProps {
  index: number;
  destination: {
    id: string;
    day: number;
    name: string;
    activities: { id: string; name: string; time?: string; spot?: string }[];
  };
  control: Control<StepTwoType>;
  register: UseFormRegister<StepTwoType>;
  errors: FieldErrors<StepTwoType>;
  setValue: UseFormSetValue<StepTwoType>;
}

function Destination({
  index,
  destination,
  control,
  register,
  errors,
  setValue,
}: DestinationProps) {
  const {
    fields: activityFields,
    append: addActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: `destinations.${index}.activities` as const,
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleFocus = (fieldName: string) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  return (
    <motion.div
      key={destination.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      variants={itemVariants}
      className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-midnight-blue">
          Day {destination.day}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Destination Name
          </label>
          <input
            type="text"
            {...register(`destinations.${index}.name`)}
            onFocus={() => handleFocus(`destinations.${index}.name`)}
            onBlur={handleBlur}
            className="w-full px-4 h-11 rounded-lg border text-charcoal text-sm transition-all duration-200 outline-none border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
            placeholder="Enter destination name"
          />
          {errors.destinations?.[index]?.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              Destination name is required
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-charcoal">
            Activities
          </label>
          <AnimatePresence mode="popLayout">
            {activityFields.map((activity, activityIndex) => (
              <motion.div
                key={activity.id}
                transition={{ duration: 0.1, ease: "easeIn" }}
                className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 bg-gray-50 rounded-lg transition-all duration-50"
              >
                <div className="flex-grow space-y-2">
                  <input
                    type="text"
                    {...register(
                      `destinations.${index}.activities.${activityIndex}.name`
                    )}
                    onFocus={() =>
                      handleFocus(
                        `destinations.${index}.activities.${activityIndex}.name`
                      )
                    }
                    onBlur={handleBlur}
                    className="w-full px-4 h-11 rounded-lg border text-charcoal text-sm transition-all duration-200 outline-none border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                    placeholder="Activity name"
                  />
                  {errors.destinations?.[index]?.activities?.[activityIndex]
                    ?.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      Activity name is required
                    </p>
                  )}
                  <div className="sm:flex flex flex-col gap-2">
                    <div className="flex-grow relative">
                      <TimeInput
                        value={activity.time ?? ""}
                        onChange={(timeValue) =>
                          setValue(
                            `destinations.${index}.activities.${activityIndex}.time`,
                            timeValue
                          )
                        }
                        onFocus={() =>
                          handleFocus(
                            `destinations.${index}.activities.${activityIndex}.time`
                          )
                        }
                        onBlur={handleBlur}
                        focused={
                          focusedField ===
                          `destinations.${index}.activities.${activityIndex}.time`
                        }
                      />
                      {errors.destinations?.[index]?.activities?.[activityIndex]
                        ?.time && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {
                            errors.destinations[index].activities[activityIndex]
                              .time.message
                          }
                        </p>
                      )}
                    </div>
                    <div className="flex-grow relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        {...register(
                          `destinations.${index}.activities.${activityIndex}.spot`
                        )}
                        onFocus={() =>
                          handleFocus(
                            `destinations.${index}.activities.${activityIndex}.spot`
                          )
                        }
                        onBlur={handleBlur}
                        className="w-full pl-10 pr-4 h-11 rounded-lg border text-charcoal text-sm transition-all duration-200 outline-none border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                        placeholder="Location (optional)"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeActivity(activityIndex)}
                  className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200 flex justify-end sm:justify-start"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            type="button"
            onClick={() =>
              addActivity({
                id: Math.random().toString(36).substr(2, 9),
                name: "",
                time: "",
                spot: "",
              })
            }
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Activity
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Destination;
