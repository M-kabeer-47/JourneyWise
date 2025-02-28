// tabs.tsx

"use client";

import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/utils/shadcn/utils";
import { useRef, useEffect, useState } from "react";


type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

interface TabsProps {
  tabs: Tab[];
  containerClassName?: string;
  contentClassName?: string;
  type: (value: string) => void;
  value: string;
}

export const Tabs = ({
  tabs,
  containerClassName,
  contentClassName,
  type,
  value,
}: TabsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tabPositions, setTabPositions] = useState<{ [key: string]: any }>({});
  const [activeIndicatorWidth, setActiveIndicatorWidth] = useState(0);
  const [activeIndicatorX, setActiveIndicatorX] = useState(0);

  useEffect(() => {
    const updateTabPositions = () => {
      const positions: { [key: string]: any } = {};
      const container = containerRef.current;

      if (!container) return;

      tabs.forEach((tab) => {
        const tabElement = container.querySelector(`[data-tab-value="${tab.value}"]`);
        if (tabElement) {
          const rect = tabElement.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          positions[tab.value] = {
            x: rect.left - containerRect.left,
            width: rect.width,
          };
        }
      });

      setTabPositions(positions);
      // Update active indicator on initial load
      if (value in positions) {
        setActiveIndicatorWidth(positions[value].width);
        setActiveIndicatorX(positions[value].x);
      }
    };

    updateTabPositions();

    window.addEventListener("resize", updateTabPositions);
    return () => window.removeEventListener("resize", updateTabPositions);
  }, []);

  useEffect(() => {
    if (value in tabPositions) {
      setActiveIndicatorWidth(tabPositions[value].width);
      setActiveIndicatorX(tabPositions[value].x);
    }
  }, [value, tabPositions]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-row items-center justify-start [perspective:1000px] relative overflow-visible max-w-full w-full",
        containerClassName
      )}
    >
      <motion.div
        className="absolute rounded-full bg-ocean-blue"
        style={{
          height: "100%",
          width: activeIndicatorWidth,
          x: activeIndicatorX,
          zIndex: 1,
        }}
        transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.title}
          data-tab-value={tab.value}
          onClick={() => type(tab.value)}
          className={cn(
            "px-4 py-2 rounded-full relative",
            "after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-ocean-blue after:opacity-0 after:transition-opacity hover:after:opacity-10"
          )}
        >
          {tab.title}
        </button>
      ))}
      {/* Content */}
      <motion.div
        className={cn(
          "absolute inset-x-0 top-12 bg-white rounded-lg shadow p-6 z-0",
          contentClassName
        )}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
      >
        {tabs.find((t) => t.value === value)?.content}
      </motion.div>
    </div>
  );
};