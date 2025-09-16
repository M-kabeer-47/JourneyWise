import React from "react";
import { motion } from "framer-motion";

export default function AccountSettingsTabSkeleton() {
  return (
    <div className="space-y-8">
      {/* Profile Information Skeleton */}
      <div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div>
            <div className="h-6 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse border-4 border-white shadow-lg"></div>
          </div>

          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-3 animate-pulse"></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name Field */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Email Field */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Bio Field */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <div className="w-full sm:w-[170px] h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Email Verification Skeleton */}
      <div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="sm:w-10 sm:h-10 w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="h-6 bg-gray-200 rounded w-36 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-56 animate-pulse"></div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="flex items-center justify-between p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
          </div>
          <div className="w-[170px] h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Account Status Skeleton */}
      <div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="sm:w-10 sm:h-10 w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
        </div>

        {/* Account Status Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
              <div>
                <div className="h-5 bg-gray-200 rounded w-28 mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
              </div>
            </div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
