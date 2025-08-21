"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabOption {
  key: string;
  label: string;
  count?: number;
}

interface TabsProps {
  options: TabOption[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export function Tabs({ options, activeKey, onChange, className = "" }: TabsProps) {
  return (
    <TabsPrimitive.Root value={activeKey} onValueChange={onChange} className={className}>
      <TabsPrimitive.List className="flex gap-2 mb-8">
        {options.map((tab) => {
          const isActive = activeKey === tab.key;
          return (
            <TabsPrimitive.Trigger
              key={tab.key}
              value={tab.key}
              className={cn(
                "relative px-5 py-2 rounded-md font-medium whitespace-nowrap transition-colors duration-200",
                isActive
                  ? "bg-ocean-blue text-white"
                  : "bg-ocean-blue/10 text-ocean-blue hover:bg-ocean-blue/20"
              )}
              style={{ position: "relative", overflow: "hidden" }}
            >
              <span className="relative z-10 flex items-center gap-1">
                {tab.label}
                {typeof tab.count === "number" && (
                  <span className="ml-1 text-xs font-semibold">{tab.count}</span>
                )}
              </span>
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute left-0 bottom-0 h-1 w-full bg-ocean-blue"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </TabsPrimitive.Trigger>
          );
        })}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}