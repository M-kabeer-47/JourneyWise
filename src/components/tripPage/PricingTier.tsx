"use client"
import React, { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/utils/shadcn/utils";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

export interface TierInfo {
  name: string;
  price: number;
  members: number;
  description: string;
}

interface PricingTierProps {
  currency: string;
  tiers: TierInfo[];
  className?: string;
}

const PricingTier = ({
  currency,
  tiers,

  className,
}: PricingTierProps) => {
  const [currentTier, setCurrentTier] = useState(tiers[0]);
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-xl font-semibold text-midnight-blue">
        Choose Your Experience
      </h3>

      <Tabs
        value={currentTier.name}
        onValueChange={(value) => {
          const selected = tiers.find((tier) => tier.name === value);
          if (selected) setCurrentTier(selected);
        }}
        className="w-full"
      >
        <TabsList
          className="w-full grid bg-gray-100 p-1"
          style={{ gridTemplateColumns: `repeat(${tiers.length}, 1fr)` }}
        >
          {tiers.map((tier) => (
            <TabsTrigger
              key={tier.name}
              value={tier.name}
              className={cn(
                "data-[state=active]:bg-white data-[state=active]:text-midnight-blue data-[state=active]:shadow-sm",
                "transition-all duration-200"
              )}
            >
              {tier.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="relative overflow-hidden rounded-xl group  bg-white border border-gray-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTier.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <h4 className="text-xl font-medium text-midnight-blue mb-1.5">
              {currentTier.name}
            </h4>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold text-midnight-blue">
                {currency} {currentTier.price.toLocaleString()}
              </span>
            </div>

            <div className="mt-4 flex items-center">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-ocean-blue/10">
                <User className="h-5 w-5 text-ocean-blue" />
              </div>
              <p className="ml-3 text-sm text-gray-600">
                <span className="font-medium text-gray-900">
                  {currentTier.members}
                </span>{" "}
                {currentTier.members === 1 ? "person" : "people"}
              </p>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              {currentTier.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PricingTier;
