import React from 'react';

export const InformationCardsSkeleton = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
          <div className="w-48 h-5 bg-gray-200 rounded animate-pulse mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="w-12 h-6 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};