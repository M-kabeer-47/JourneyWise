"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { ExperienceResponse } from "@/lib/types/experience";
import { UserDetailsSection } from "./UserDetailsSection";
import { ExperiencePackageSection } from "./ExperiencePackageSection";
import { StartDateSelector } from "./StartDateSelector";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Booking } from "@/lib/schemas/booking";

interface BookingFormProps {
  formFunctions: {
    register: UseFormRegister<Booking>;
    control: Control<Booking>;
    errors: FieldErrors<Booking>;
    setValue: UseFormSetValue<Booking>;
    watch: UseFormWatch<Booking>;
  };
  experienceData: ExperienceResponse;
  isCustomTierSelected: boolean;
  setIsCustomTierSelected: (isCustom: boolean) => void;

  handleSubmit: () => void;
}

export default function BookingForm({
  formFunctions,

  isCustomTierSelected,
  setIsCustomTierSelected,
  handleSubmit,
  experienceData,
}: BookingFormProps) {
  const { register, control, errors, setValue, watch } = formFunctions;
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const handleDateSelect = (date: Date | undefined) => {
    if (date !== undefined) {
      setValue("startDate", date, { shouldValidate: true });
      const calculatedEndDate = addDays(
        new Date(date),
        experienceData.experience?.duration - 1
      );
      setValue("endDate", calculatedEndDate);
    }
  };

  const handleTierSelect = (index: number) => {
    setSelectedTierIndex(index);
    setValue("tier", experienceData.experience?.tiers[index]);
    if (
      experienceData.experience?.tiers[index]?.name !== "custom" &&
      isCustomTierSelected
    ) {
      setIsCustomTierSelected(false);
    }
  };

  const handleCustomTierSelect = () => {
    setIsCustomTierSelected(!isCustomTierSelected);
    if (isCustomTierSelected) {
      setSelectedTierIndex(0);
    } else {
      setSelectedTierIndex(-1);
      setValue("tier", {
        name: "custom", //@ts-ignore
        price: "", //@ts-ignore
        members: "",
        description: "",
      });
      setValue("packageCount", 1);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <UserDetailsSection
        register={register}
        control={control}
        errors={errors}
      />

      <ExperiencePackageSection
        tiers={experienceData.experience.tiers}
        currency={experienceData.experience.currency}
        selectedTierIndex={selectedTierIndex}
        isCustomTierSelected={isCustomTierSelected}
        onTierSelect={handleTierSelect}
        onCustomTierSelect={handleCustomTierSelect}
        register={register}
        errors={errors}
      />

      <StartDateSelector
        startDate={startDate}
        endDate={endDate}
        duration={experienceData.experience.duration}
        onDateSelect={handleDateSelect}
        error={errors.startDate?.message}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="pt-6 border-t border-gray-100"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-ocean-blue/20 flex items-center justify-center text-white">
            <MessageSquare size={16} className="text-midnight-blue" />
          </div>
          <h2 className="text-2xl font-bold text-midnight-blue">
            Additional Information
          </h2>
        </div>

        <div>
          <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
            Special Requests (Optional)
          </Label>
          <textarea
            id="notes"
            {...register("notes")}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-200 p-3 text-charcoal text-sm
           transition-all duration-200 outline-none focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
            placeholder="Any dietary requirements, accessibility needs, or other special requests..."
          />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="pt-6 border-t border-gray-100"
      >
        <Button
          type="submit"
          className="w-full bg-ocean-blue text-white py-4 sm:py-6 rounded-lg shadow-md hover:bg-midnight-blue transition-all duration-300"
        >
          <span className="flex items-center justify-center text-sm sm:text-base">
            Request Booking
          </span>
        </Button>
      </motion.div>
      
    </form>
  );
}
