import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectorProps {
  options: string[];
  onClick: (option: string) => void;
  value?: string;
  className?: string;
  isSmall?: boolean;
}

export default function Selector({
  options,
  onClick,
  className = "",
  isSmall = false,
  value = "",
}: SelectorProps) {
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 ${
          isSmall ? "sm:text-sm text-xs" : "sm:text-base text-sm"
        }  rounded-lg hover:border-ocean-blue transition-colors bg-white w-full px-4 py-2.5 border border-gray-300 ${className}`}
      >
        <p className={`flex gap-2 w-full items-center text-charcoal `}>
          <span
            className={`text-charcoal  ${
              isSmall ? "sm:text-sm text-xs" : "text-sm sm:text-base"
            }`}
          >
            {value || "Select an option"}
          </span>
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
              <div
                key={index}
                className={`px-1 ${
                  value === option
                    ? "font-medium bg-ocean-blue/5"
                    : "hover:bg-ocean-blue/5"
                }`}
              >
                <button
                  type="button"
                  className={`flex items-center justify-between w-full px-2 py-2 text-xs sm:text-sm text-left  rounded-md `}
                  onClick={() => {
                    setIsOpen(false);
                    onClick(option);
                  }}
                >
                  <span className={` sm:text-sm text-xs  text-charcoal `}>
                    {option}
                  </span>
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
