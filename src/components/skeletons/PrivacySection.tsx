import React from "react";
import { motion } from "framer-motion";

export default function PrivacySecuritySectionSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 rounded-full animate-pulse" />
        <div>
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Privacy Options */}
      <div className="space-y-6">
        <div>
          <div className="h-4 w-36 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 rounded-lg border border-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-44 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-10 h-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
