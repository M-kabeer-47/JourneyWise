import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { stepTwoSchema } from "@/lib/schemas/experience";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { z } from "zod";
import Destination from "../components/Destination"; // Adjust import path as needed

type StepTwoType = z.infer<typeof stepTwoSchema>;

interface FormStep2Props {
  register: UseFormRegister<StepTwoType>;
  data: StepTwoType;
  errors: FieldErrors<StepTwoType>;
  duration: number;
  control: Control<StepTwoType>;
  setValue: UseFormSetValue<StepTwoType>;
}

export default function FormStep2({
  data,
  errors,
  duration,
  control,
  register,
  setValue,
}: FormStep2Props) {
  useEffect(() => {
    // Initialize destinations based on duration
    if (data.destinations.length === duration) return;

    const newDestinations = Array.from({ length: duration }, (_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      day: i + 1,
      name: `Destination ${i + 1}`,
      activities: [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: "",
          time: "12:00 AM",
          spot: "",
        },
      ],
    }));
    setValue("destinations", newDestinations);
  }, [duration]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue">
          Itinerary Builder
        </h2>
        <p className="mt-2 text-base text-charcoal">
          Create your day-by-day travel itinerary
        </p>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {data.destinations.map((destination, index) => (
            <Destination
              key={destination.id}
              index={index}
              destination={destination}
              control={control}
              register={register}
              errors={errors}
              setValue={setValue}
              activities={data.destinations[index].activities}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
