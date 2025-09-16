import React from "react";
import { motion } from "framer-motion";

export default function TravelInterestsSectionSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200 mb-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 rounded-full animate-pulse" />
        <div>
          <div className="h-5 w-36 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-52 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Region Selection */}
      <div className="space-y-6">
        <div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-12 bg-gray-100 rounded-lg border border-gray-200 animate-pulse" />
        </div>

        {/* Interest Tags */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-8 w-20 bg-gray-100 rounded-full border border-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
