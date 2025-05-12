'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Globe, DollarSign, Users } from 'lucide-react'

export default function AgentRegistration() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50 relative top-[140px]">
      <div className="mx-auto px-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row">
            
            <div className="lg:w-1/2 relative min-h-[500px]">
              <Image
                src="/agent.avif"
                alt="Travel agent working on laptop"
                fill
                className="object-cover transition-transform duration-300 transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">Join Our Network</h3>
                <p className="text-white text-base sm:text-lg">Become a part of the fastest-growing travel community</p>
              </div>
            </div>
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 bg-midnight-blue">
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Become a JourneyWise Agent
              </motion.h2>
              <motion.p 
                className="text-base sm:text-lg mb-6 sm:mb-8 text-white opacity-90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Transform your passion for travel into a thriving business. As a JourneyWise agent, you'll create unique experiences, set your own rates, and connect with adventure-seekers worldwide. Our platform provides the tools and support you need to succeed in the global travel market.
              </motion.p>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex flex-col items-center text-center">
                  <Globe className="h-10 w-10 sm:h-12 sm:w-12 text-accent mb-2" />
                  <h4 className="text-white font-semibold mb-1">Global Reach</h4>
                  <p className="text-white opacity-80 text-xs sm:text-sm">Connect with travelers worldwide and expand your business</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <DollarSign className="h-10 w-10 sm:h-12 sm:w-12 text-accent mb-2" />
                  <h4 className="text-white font-semibold mb-1">Flexible Earnings</h4>
                  <p className="text-white opacity-80 text-xs sm:text-sm">Set your rates and receive secure, timely payments</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-accent mb-2" />
                  <h4 className="text-white font-semibold mb-1">Powerful Tools</h4>
                  <p className="text-white opacity-80 text-xs sm:text-sm">Access intuitive booking and management features</p>
                </div>
              </motion.div>
              <motion.button
                className="bg-gradient-to-r from-midnight-blue to-ocean-blue text-white py-3 px-6 sm:px-8 rounded-full font-semibold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center w-full lg:w-auto hover:bg-accent"
                
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Start Your Agent Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}