'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function TierSelectionCard({ tier, currency, isSelected, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(tier.name)}
      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
        isSelected 
          ? 'border-ocean-blue bg-ocean-blue/5 shadow-lg' 
          : 'border-gray-200 hover:border-ocean-blue/30 hover:bg-gray-50/80'
      }`}
    >
      <div className="p-5 relative">
        {isSelected && (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-3 right-3 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-ocean-blue rounded-full opacity-20 scale-150 animate-pulse"></div>
            <div className="h-7 w-7 rounded-full bg-ocean-blue flex items-center justify-center">
              <Check className="h-4 w-4 text-white" strokeWidth={3} />
            </div>
          </motion.div>
        )}

        <div className="flex items-start mb-4">
          <div>
            <h3 className={`font-semibold text-lg ${isSelected ? 'text-ocean-blue' : 'text-midnight-blue'}`}>
              {tier.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              For {tier.members} {tier.members === 1 ? 'person' : 'people'}
            </p>
          </div>
        </div>

        <hr className={`border-t ${isSelected ? 'border-ocean-blue/20' : 'border-gray-200'} my-3`} />
        
        <div className="flex items-baseline">
          <span className="text-sm text-gray-500 mr-1">{currency}</span>
          <span className={`text-2xl font-bold ${isSelected ? 'text-ocean-blue' : 'text-midnight-blue'}`}>
            {tier.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 ml-2">/package</span>
        </div>

        {tier.features && tier.features.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-2.5">
            {tier.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex-shrink-0 w-5 h-5 rounded-full ${
                  isSelected 
                    ? 'bg-ocean-blue/10 text-ocean-blue' 
                    : 'bg-green-50 text-green-600'
                } flex items-center justify-center mr-3`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        )}

        <motion.div 
          className={`mt-4 py-2 text-center rounded-lg transition-colors ${
            isSelected ? 'bg-ocean-blue/10 text-ocean-blue' : 'bg-gray-100 text-gray-500'
          }`}
          animate={isSelected ? { y: 0 } : { y: 0 }}
          whileHover={{ y: -2 }}
        >
          {isSelected ? 'Selected Package' : 'Select Package'}
        </motion.div>
      </div>
    </motion.div>
  );
}