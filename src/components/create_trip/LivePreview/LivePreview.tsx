import { motion, AnimatePresence } from "framer-motion";
import type { UseFormWatch } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { ExperienceData } from "@/lib/schemas/experience";

interface Tier {
  name: string;
  members: number | undefined;
  price: number | undefined; // Make sure undefined is allowed here
  description: string;
}

interface LivePreviewProps {
  formData: ExperienceData;
  currentStep: number;
  activeTierIndex: number;
  setActiveTierIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function LivePreview({
  formData,
  currentStep,
  setActiveTierIndex,
  activeTierIndex,
}: LivePreviewProps) {
  const prevTiersLength = useRef(formData.tiers.length);
  let tiers = formData.tiers;
  let title = formData.title;
  let country = formData.country;
  let city = formData.city;
  let category = formData.category;
  let duration = formData.duration;
  let tags = formData.tags;
  let description = formData.description;
  let availability = formData.availability;
  let experienceImage = formData.experienceImage;
  let requirements = formData.requirements;
  let agentName = "Agent Name";
  let currency = formData.currency;
  let experienceImages = formData.experienceImages;
  let includedServices = formData.includedServices;
  let excludedServices = formData.excludedServices;
  let destinations = formData.destinations;

  useEffect(() => {
    if (tiers.length > 0 && activeTierIndex >= tiers.length) {
      setActiveTierIndex(tiers.length - 1);
    }
  }, [tiers.length, activeTierIndex, setActiveTierIndex]);

  useEffect(() => {
    if (tiers.length > prevTiersLength.current) {
      // New tier added - set active to last tier (newly added)
      setActiveTierIndex(tiers.length - 1);
    } else if (tiers.length < prevTiersLength.current) {
      // Tier removed - clamp active index to new max
      setActiveTierIndex((prev) => Math.min(prev, tiers.length - 1));
    }
    prevTiersLength.current = tiers.length;
  }, [tiers.length, setActiveTierIndex]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  function formatPrice(price: number | string | null): string {
    if (price === null) return "0";
    const numericPrice =
      typeof price === "string" ? Number.parseFloat(price) : price;
    if (isNaN(numericPrice)) return "0";
    return numericPrice.toLocaleString("en-US", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col gap-6 md:gap-8"
        >
          {currentStep === 1 && (
            <StepOne
              title={title}
              country={country}
              city={city}
              category={category}
              duration={duration}
              tags={tags}
              description={description}
              availability={availability}
              experienceImage={experienceImage}
              itemVariants={itemVariants}
            />
          )}

          {currentStep === 2 && (
            <StepTwo destinations={destinations} itemVariants={itemVariants} />
          )}

          {currentStep === 3 && (
            <StepThree
              images={experienceImages}
              includedServices={includedServices}
              excludedServices={excludedServices}
              itemVariants={itemVariants}
            />
          )}

          {currentStep === 4 && (
            <StepFour
              requirements={requirements}
              tiers={tiers}
              activeTierIndex={activeTierIndex}
              setActiveTierIndex={setActiveTierIndex}
              currency={currency}
              formatPrice={formatPrice}
              title={title}
              agentName={agentName}
              itemVariants={itemVariants}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
