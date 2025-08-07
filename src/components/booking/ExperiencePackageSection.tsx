"use client";

import { motion } from "framer-motion";
import { Badge } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TierSelectionCard } from "./TierSelectionCard";
import { CustomTierSection } from "./TierSelectionCard";
import { tier } from "@/lib/types/experience";

interface ExperiencePackageSectionProps {
  tiers: tier[];
  currency: string;
  selectedTierIndex: number;
  isCustomTierSelected: boolean;
  onTierSelect: (index: number) => void;
  onCustomTierSelect: () => void;
  register: any;
  errors: any;
}

export const ExperiencePackageSection = ({
  tiers,
  currency,
  selectedTierIndex,
  isCustomTierSelected,
  onTierSelect,
  onCustomTierSelect,
  register,
  errors,
}: ExperiencePackageSectionProps) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="pt-6 border-t border-gray-100"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-ocean-blue/20 flex items-center justify-center text-white">
          <Badge size={16} className="text-midnight-blue" />
        </div>
        <h2 className="text-2xl font-bold text-midnight-blue">
          Experience Package
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tiers.map((tier, index) => (
          <TierSelectionCard
            key={index}
            tier={tier}
            currency={currency}
            isSelected={selectedTierIndex === index}
            onSelect={() => onTierSelect(index)}
          />
        ))}
      </div>

      {!isCustomTierSelected && (
        <div className="mt-4">
          <Label
            htmlFor="packageCount"
            className="text-sm font-medium text-gray-700"
          >
            Number of Packages
          </Label>
          <div className="mt-1 relative">
            <input
              id="packageCount"
              type="number"
              {...register("packageCount", { valueAsNumber: true })}
              className="pl-3 w-full h-10 rounded-lg border-gray-200 text-charcoal text-sm
        transition-all duration-200 outline-none border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
              placeholder="Enter number of packages"
            />
          </div>
          {errors.packageCount && (
            <p className="mt-1 text-sm text-red-600">
              {errors.packageCount.message}
            </p>
          )}
        </div>
      )}

      {errors.tier && (
        <p className="mt-1 text-sm text-red-600">{errors.tier.message}</p>
      )}

      {/* Custom Tier Option */}
      <CustomTierSection
        isCustomTierSelected={isCustomTierSelected}
        handleCustomTierSelect={onCustomTierSelect}
        register={register}
        errors={errors}
      />
    </motion.div>
  );
};
