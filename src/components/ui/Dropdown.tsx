"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DropdownMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

interface DropdownProps {
  items: DropdownMenuItem[];
  isOpen: boolean;
  align?: "start" | "end";
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function Dropdown({
  items,
  isOpen,
  align = "end",
  size = "medium",
  className = "",
}: DropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.18 }}
          className={`absolute z-50 mt-1 ${
            align === "end" ? "right-0" : "left-0"
          } ${
            size === "small"
              ? "w-28"
              : size === "large"
              ? "w-48"
              : "w-36"
          } rounded-lg shadow-lg bg-white border border-gray-200  ${className}`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                item.onClick();
              }}
              className={`flex justify-center items-center rounded-lg w-full px-3 py-2 text-sm transition-colors ${
                item.destructive
                  ? "text-red-600 hover:bg-red-50"
                  : "text-charcoal hover:bg-gray-50"
              }`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
