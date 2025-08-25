"use client";

import React from "react";

export default function TripSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-pulse">
      {/* Header Skeleton */}
      <div className="relative h-48 bg-gray-100 p-4">
        <div className="h-full flex items-center justify-center">
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mb-1"></div>
                  <div className="w-12 h-3 bg-gray-300 rounded"></div>
                </div>
                {index < 2 && (
                  <div className="w-6 h-0.5 bg-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="flex-1">
              <div className="w-12 h-3 bg-gray-300 rounded mb-1"></div>
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="flex-1">
              <div className="w-16 h-3 bg-gray-300 rounded mb-1"></div>
              <div className="w-12 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Route Info */}
        <div className="flex items-start gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-300 rounded mt-0.5"></div>
          <div className="flex-1">
            <div className="w-10 h-3 bg-gray-300 rounded mb-1"></div>
            <div className="w-full h-4 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Distance */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="flex-1">
            <div className="w-14 h-3 bg-gray-300 rounded"></div>
            <div className="w-20 h-4 bg-gray-300 rounded ml-2 mt-1"></div>
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="w-16 h-3 bg-gray-300 rounded mb-1"></div>
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <div className="w-20 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
