"use client";

import { motion } from "framer-motion";
import { Check, DollarSign } from "lucide-react";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { CustomCheckbox } from "@/components/ui/CheckBox";

export function TierSelectionCard({
  tier,
  currency,
  isSelected,
  onSelect,
}: {
  tier: { name: string; price: number; members: number };
  currency: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect()}
      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
        isSelected
          ? "border-ocean-blue bg-ocean-blue/5 shadow-lg"
          : "border-gray-200 hover:border-ocean-blue/30 hover:bg-gray-50/80"
      }`}
    >
      <div className="p-5 relative">
        {isSelected && (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-3 right-3 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-ocean-blue rounded-full opacity-20 scale-150 animate-pulse"></div>
            <div className="h-7 w-7 rounded-full bg-ocean-blue flex items-center justify-center">
              <Check className="h-4 w-4 text-white" strokeWidth={3} />
            </div>
          </motion.div>
        )}

        <div className="flex items-start mb-4">
          <div>
            <h3
              className={`font-semibold text-lg ${
                isSelected ? "text-ocean-blue" : "text-midnight-blue"
              }`}
            >
              {tier.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              For {tier.members} {tier.members === 1 ? "person" : "people"}
            </p>
          </div>
        </div>

        <hr
          className={`border-t ${
            isSelected ? "border-ocean-blue/20" : "border-gray-200"
          } my-3`}
        />

        <div className="flex items-baseline">
          <span className="text-sm text-gray-500 mr-1">{currency}</span>
          <span
            className={`text-2xl font-bold ${
              isSelected ? "text-ocean-blue" : "text-midnight-blue"
            }`}
          >
            {tier.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 ml-2">/package</span>
        </div>

        <motion.div
          className={`mt-4 py-2 text-center rounded-lg transition-colors ${
            isSelected
              ? "bg-ocean-blue/10 text-ocean-blue"
              : "bg-gray-100 text-gray-500"
          }`}
          animate={isSelected ? { y: 0 } : { y: 0 }}
          whileHover={{ y: -2 }}
        >
          {isSelected ? "Selected Package" : "Select Package"}
        </motion.div>
      </div>
    </motion.div>
  );
}

// First, let's create a custom styled checkbox component


export const CustomTierSection = ({
  isCustomTierSelected,
  handleCustomTierSelect,
  register,
  errors,
}: {
  isCustomTierSelected: boolean;
  handleCustomTierSelect: () => void;
  register: any; // Replace with the correct type for your form register
  errors: any; // Replace with the correct type for your form errors
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 border-t border-gray-200 pt-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-ocean-blue/20 flex items-center justify-center mr-2 ">
            <span className="text-midnight-blue text-sm ">✦</span>
          </div>
          <h3 className="text-lg font-medium text-midnight-blue">
            Custom Experience
          </h3>
        </div>

        <CustomCheckbox
          id="customTier"
          checked={isCustomTierSelected}
          onChange={handleCustomTierSelect}
          label=""
        />
      </div>

      {isCustomTierSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="customMembers"
                className="text-sm font-medium text-gray-700"
              >
                Number of travelers
              </Label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="customMembers"
                  type="number"
                  min="1"
                  max="20"
                  {...register("tier.members", {
                    valueAsNumber: true,
                    
                  })}
                  defaultValue="2"
                  className="pl-10 w-full h-10 rounded-lg border-gray-200 text-charcoal text-sm
                  transition-all duration-200 outline-none border border-gray-200 focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                  placeholder="Enter number of travelers"
                />
              </div>
              {errors?.tier?.members && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tier.members.message}
                </p>
              )}
              <div className="mt-1 relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="price"
                  type="number"
                  min={1}
                  {...register("tier.price", {
                    valueAsNumber: true,
                    
                  })}
                  defaultValue="2"
                  className="pl-10 w-full h-10 rounded-lg border-gray-200 text-charcoal text-sm
                  transition-all duration-200 outline-none border border-gray-200 focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                  placeholder="Enter your price"
                />
              </div>
              {errors?.tier?.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tier.price.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="text-sm text-blue-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Your agent will review your custom request and confirm
              availability and pricing
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
