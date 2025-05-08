'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

export function TierSelectionCard({ tier, currency, isSelected, onSelect }) {
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



// First, let's create a custom styled checkbox component
const CustomCheckbox = ({ id, checked, onChange, label }) => {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="peer h-4 w-4 opacity-0 absolute"
        />
        <div className="h-4 w-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-ocean-blue peer-checked:border-ocean-blue transition-colors">
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <label htmlFor={id} className="ml-2 text-sm text-gray-600 cursor-pointer">
        {label}
      </label>
    </div>
  );
};


export const CustomTierSection = ({ 
  isCustomTierSelected, 
  setIsCustomTierSelected,
  register,
  errors
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 border-t border-gray-200 pt-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-ocean-blue/20 flex items-center justify-center mr-2">
            <span className="text-midnight-blue text-sm">✦</span>
          </div>
          <h3 className="text-lg font-medium text-midnight-blue">
            Custom Experience
          </h3>
        </div>
        
        <CustomCheckbox
          id="customTier"
          checked={isCustomTierSelected}
          onChange={() => setIsCustomTierSelected(!isCustomTierSelected)}
          label="Request custom package"
        />
      </div>

      {isCustomTierSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="customMembers"
                className="text-sm font-medium text-gray-700"
              >
                Number of travelers
              </Label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="customMembers"
                  type="number"
                  min="1"
                  max="20"
                  {...register("customMembers")}
                  defaultValue="2"
                  className="pl-10 w-full h-10 rounded-lg border-gray-200 text-charcoal text-sm
                  transition-all duration-200 outline-none border border-gray-200 focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                  placeholder="Enter number of travelers"
                />
              </div>
              {errors?.customMembers && (
                <p className="mt-1 text-sm text-red-600">{errors.customMembers.message}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="customNotes"
                className="text-sm font-medium text-gray-700"
              >
                Custom requirements
              </Label>
              <textarea
                id="customNotes"
                {...register("customNotes")}
                rows={2}
                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 text-charcoal text-sm
                transition-all duration-200 outline-none focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                placeholder="Please describe your budget expectations and any specific requirements..."
              />
            </div>
          </div>

          <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="text-sm text-blue-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Your agent will review your custom request and confirm availability and pricing
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};


