import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Map, FileText, Bookmark, Calendar } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  
}

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "trips", label: "Trips", icon: Map },
  { id: "blogs", label: "Blogs", icon: FileText },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "bookings", label: "Bookings", icon: Calendar },
];

export default function ProfileTabs({
  activeTab,
  onTabChange,

}: ProfileTabsProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [tabDimensions, setTabDimensions] = useState<{
    [key: string]: { width: number; left: number };
  }>({});
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    // Measure all tabs when component mounts or stats change
    const dimensions: { [key: string]: { width: number; left: number } } = {};

    tabs.forEach((tab) => {
      const tabElement = tabRefs.current[tab.id];
      if (tabElement) {
        const rect = tabElement.getBoundingClientRect();
        const containerRect = tabElement.parentElement?.getBoundingClientRect();
        dimensions[tab.id] = {
          width: rect.width,
          left: rect.left - (containerRect?.left || 0),
        };
      }
    });

    setTabDimensions(dimensions);
  }, []);

  

  const getHoverDimensions = () => {
    // Don't show hover effect for active tab
    if (!hoveredTab || !tabDimensions[hoveredTab] || hoveredTab === activeTab) {
      return { width: 0, left: 0 };
    }
    return tabDimensions[hoveredTab];
  };

  const handleTabHover = (tabId: string) => {
    // Don't set hover state for active tab
    if (tabId !== activeTab) {
      setHoveredTab(tabId);
    }
  };

  return (
    <div className="bg-gray-50 relative top-[100px] sm:top-[100px] z-10 border-0">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <nav
          className="relative overflow-x-auto scrollbar-hide"
          onMouseLeave={() => setHoveredTab(null)}
        >
          <div className="flex items-center relative min-w-max sm:min-w-0 sm:justify-center md:justify-start gap-2 sm:gap-4">
            {/* Sliding hover background - Only on desktop and not for active tab */}
            <motion.div
              className="absolute top-0 bottom-0 bg-charcoal/5 rounded-lg pointer-events-none hidden md:block"
              initial={false}
              animate={{
                opacity: hoveredTab && hoveredTab !== activeTab ? 1 : 0,
                width: getHoverDimensions().width,
                x: getHoverDimensions().left,
              }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.4,
              }}
            />

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  onClick={() => onTabChange(tab.id)}
                  onMouseEnter={() => handleTabHover(tab.id)}
                  className={`relative group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 font-medium text-xs sm:text-sm whitespace-nowrap transition-all z-10 justify-center ${
                    isActive
                      ? "text-midnight-blue font-bold"
                      : "text-charcoal hover:text-midnight-blue"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon
                    className={`w-4 h-4 transition-all ${
                      isActive
                        ? "text-midnight-blue"
                        : "text-charcoal group-hover:text-midnight-blue"
                    } flex-shrink-0`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={`font-raleway ${
                      isActive ? "font-bold" : ""
                    } hidden xs:inline`}
                  >
                    {tab.label}
                  </span>

                  {/* Mobile: Show abbreviated labels */}
                  <span className={`${isActive ? "font-bold" : ""} xs:hidden`}>
                    {tab.id === "profile"
                      ? "Profile"
                      : tab.id === "trips"
                      ? "Trips"
                      : tab.id === "blogs"
                      ? "Blogs"
                      : tab.id === "saved"
                      ? "Saved"
                      : "Bookings"}
                  </span>

                  {/* Stats badge */}
                 

                  {/* Active tab underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-2 right-2 sm:left-4 sm:right-4 h-0.5 bg-ocean-blue"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Bottom border */}
        <div className="mt-4 border-b border-gray-100" />
      </div>
    </div>
  );
}
