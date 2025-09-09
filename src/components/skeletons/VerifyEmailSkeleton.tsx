import { motion } from "framer-motion";

export default function VerifyEmailSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-blue/5 to-midnight-blue/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon Skeleton */}
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>

          {/* Title Skeleton */}
          <div className="mb-4">
            <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
          </div>
          
          {/* Description Skeleton */}
          <div className="mb-2">
            <div className="h-6 bg-gray-200 rounded w-full mx-auto animate-pulse"></div>
          </div>
          <div className="mb-8">
            <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>

          {/* Email Skeleton */}
          <div className="mb-8">
            <div className="h-5 bg-ocean-blue/20 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>

          {/* Additional Info Skeleton */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}