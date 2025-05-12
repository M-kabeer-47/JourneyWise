import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i + 1 <= currentStep
                    ? 'bg-gradient-to-r from-midnight-blue to-ocean-blue text-white shadow-lg shadow-ocean-blue/30'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i + 1 <= currentStep ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {i + 1}
                  </motion.span>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  i + 1 <= currentStep ? 'text-midnight-blue' : 'text-gray-400'
                }`}
              >
                {i === 0 ? 'Account' : i === 1 ? 'Profile' : 'Picture'}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div className="flex-1 h-1 mx-2 relative">
                <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-midnight-blue to-ocean-blue rounded-full"
                  initial={{ width: i + 1 < currentStep ? '100%' : '0%' }}
                  animate={{ width: i + 1 < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;

