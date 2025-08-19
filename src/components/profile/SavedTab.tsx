import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';

interface SavedTabProps {
  savedItems: any[];
}

export default function SavedTab({ savedItems }: SavedTabProps) {
  const [activeType, setActiveType] = useState<'all' | 'experiences' | 'blogs' | 'trips'>('all');
  
  const filteredItems = activeType === 'all' 
    ? savedItems 
    : savedItems.filter(item => item.entityType === activeType.slice(0, -1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-midnight-blue">Saved Items</h2>
          <p className="text-gray-600">Your bookmarked experiences, trips, and blogs</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto">
        {[
          { key: 'all', label: 'All Items' },
          { key: 'experiences', label: 'Experiences' },
          { key: 'trips', label: 'Trips' },
          { key: 'blogs', label: 'Blogs' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveType(tab.key as any)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              activeType === tab.key
                ? 'bg-gradient-to-r from-midnight-blue to-ocean-blue text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-midnight-blue to-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-midnight-blue mb-2">No saved items yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start exploring and save your favorite experiences, trips, and blogs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.experience?.imageUrl || item.trip?.imageUrl || '/placeholder.jpg'}
                  alt={item.experience?.title || `${item.trip?.startPoint} → ${item.trip?.endPoint}` || 'Saved item'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-ocean-blue/10 text-ocean-blue rounded text-xs font-medium uppercase">
                    {item.entityType}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-midnight-blue mb-1">
                  {item.experience?.title || `${item.trip?.startPoint} → ${item.trip?.endPoint}` || 'Saved Item'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.experience?.location || `${item.trip?.estimatedDistance}km • $${item.trip?.estimatedBudget}` || 'View details'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}