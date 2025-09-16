import React from "react";
import { motion } from "framer-motion";

export default function DisplayThemeSectionSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200 mb-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 rounded-full animate-pulse" />
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Theme Options */}
      <div className="space-y-6">
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 rounded-lg border border-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>

        <div>
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 rounded-lg border border-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
