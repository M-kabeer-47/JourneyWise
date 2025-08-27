import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ConsoleLogWriter } from "drizzle-orm";

type SortOption = {
  value: string;
  label: string;
};

interface SortByProps {
  options: SortOption[];
  activeSort: {
    value: string;
    direction: "asc" | "desc";
  };
  onSortChange: (value: string, direction: "asc" | "desc") => void;
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function SortBy({
  options,
  activeSort,
  onSortChange,
  className = "",
  size = "large"
}: SortByProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get active option label
  const activeLabel =
    options.find((option) => option.value === activeSort.value)?.label ||
    "Sort by";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 font-semibold  rounded-lg hover:border-ocean-blue transition-colors text-gray-700 bg-white w-full ${className} ${size === "small" ? "text-xs sm:text-sm px-3 py-2 border border-gray-300" : size === "medium" ? "text-base px-3 py-2" : "text-base px-4 py-2.5 border border-gray-300"}`}
      >
        <p className="flex gap-2 w-full text-xs sm:text-sm font-semibold items-center text-charcoal">
          Sort by: {activeLabel} <span className="text-ocean-blue text-xs sm:text-sm">{activeSort.direction === "asc" ? "↑" : "↓"}</span>
        </p>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 8 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 left-0 right-0 bg-white rounded-lg shadow-lg py-1"
            style={{ minWidth: "100%", width: "max-content" }}
          >
            {options.map((option, index) => (
              <div key={index} className="px-1">
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-2 py-2 text-xs sm:text-sm font-semibold text-left hover:bg-gray-50 rounded-md"
                  onClick={() => {
                    const newDirection =
                      activeSort.value === option.value &&
                      activeSort.direction === "asc"
                        ? "desc"
                        : "asc";
                    onSortChange(
                      option.value,
                      activeSort.value === option.value
                        ? newDirection
                        : activeSort.direction
                    );

                    setIsOpen(false);
                  }}
                >
                  <span className="text-charcoal text-xs sm:text-sm font-semibold">{option.label}</span>
                  {activeSort.value === option.value && (
                    <span className="text-ocean-blue text-xs sm:text-sm">
                      {activeSort.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
