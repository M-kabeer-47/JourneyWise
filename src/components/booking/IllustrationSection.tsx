'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function IllustrationSection() {
  return (
    <div className="h-full w-full bg-[#f0f5eb] relative overflow-hidden flex flex-col rounded-lg shadow-lg">
      {/* Background with illustration */}
      <div className="absolute inset-0">
        <Image
          src="/hero.avif"
          alt="Travel illustration"
          fill
          style={{ objectFit: "cover" }}
          priority
          className="opacity-90 transition duration-500 ease-in-out transform hover:scale-105"
        />
        
        {/* Subtle gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10"></div>
      </div>

      {/* JourneyWise Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute top-6 left-8 z-20"
      >
        <div className="flex items-center">
          <h2 className="text-midnight-blue font-bold text-xl font-raleway">
            JourneyWise
          </h2>
        </div>
      </motion.div>
      
      {/* Card content - Centered positioning */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xs lg:max-w-md w-full mx-4"
        >
          <div className="bg-white/70 backdrop-blur-[1px] rounded-2xl p-6 lg:p-8 shadow-xl">
            <div className="flex items-center mb-2">
              <div className="h-6 w-6 rounded-full bg-ocean-blue/20 flex items-center justify-center mr-2">
                <span className="text-ocean-blue text-lg">✈</span>
              </div>
              <h3 className="text-midnight-blue text-sm font-medium">Your journey starts here</h3>
            </div>
            
            <h2 className="text-2xl lg:text-[32px] font-bold text-midnight-blue leading-tight mb-3">
              Begin Your <span className="text-ocean-blue">Adventure</span>
            </h2>
            
            <p className="text-gray-600 text-xs lg:text-sm mb-6">
              Complete your booking details to embark on a journey of discovery, relaxation, 
              and unforgettable experiences with JourneyWise.
            </p>
            
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                <div className="w-6 h-6 rounded-full bg-ocean-blue border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-accent border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-midnight-blue border border-white"></div>
              </div>
              <span className="text-xs text-gray-500">Thousands of travelers trust us</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}