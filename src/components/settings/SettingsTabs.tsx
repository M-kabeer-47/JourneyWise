import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

interface TabOption {
  key: string;
  label: string;
}

interface SettingsTabsProps {
  options: TabOption[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export default function SettingsTabs({ options, activeKey, onChange, className = "" }: SettingsTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIdx = options.findIndex(tab => tab.key === activeKey);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const activeTab = tabRefs.current[activeIdx];
    if (activeTab && activeTab.offsetWidth > 0) {
      setIndicator({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    } else if (tabRefs.current[0] && tabRefs.current[0].offsetWidth > 0) {
      setIndicator({
        left: tabRefs.current[0].offsetLeft,
        width: tabRefs.current[0].offsetWidth,
      });
    }
  }, [activeKey, options.length]);

  return (
    <div
      className={`relative flex bg-white shadow-sm rounded-md overflow-x-auto ${className}`}
      style={{ minHeight: 42 }}
    >
      {/* Sliding Box Indicator */}
      <motion.div
        className="absolute top-0 h-full bg-ocean-blue/10 rounded-md pointer-events-none z-0"
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ type: "slide", stiffness: 400, damping: 30 }}
        style={{
          left: indicator.left,
          width: indicator.width,
        }}
      />
      {options.map((tab, idx) => {
        const isActive = activeKey === tab.key;
        return (
          <button
            key={tab.key}
            ref={el => { tabRefs.current[idx] = el; }}
            onClick={() => onChange(tab.key)}
            className={`relative flex-shrink-0 px-6 py-3 font-medium whitespace-nowrap transition-colors duration-200 z-10
              ${isActive
                ? "text-midnight-blue"
                : "text-charcoal hover:text-midnight-blue"
              }
            `}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <span className="flex items-center justify-center gap-1 sm:text-base text-sm font-semibold font-raleway">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
