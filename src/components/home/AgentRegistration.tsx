'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Globe, DollarSign, Users } from 'lucide-react'

export default function AgentRegistration() {
  return (
    <section className="py-12 sm:py-16 px-8 md:py-24 bg-gray-50 relative top-[140px]">
      <div className="mx-auto px-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row">
            
            <div className="lg:w-1/2 relative min-h-[500px] xl:min-h-[700px] ">
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
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 xl:p-16 bg-midnight-blue flex flex-col justify-between">
              <div>
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
                
                <motion.div
                  className="hidden xl:block mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {/* Enhanced process steps */}
                  <div className="border-t border-white/10 pt-8">
                    <h4 className="text-white font-semibold mb-6 text-center">How it works</h4>
                    
                    <div className="relative">
                      {/* Connecting line between steps */}
                      
                      
                      <div className="grid grid-cols-3 gap-4">
                        {/* Step 1 */}
                        <motion.div 
                          className="flex flex-col items-center text-center relative z-10"
                        
                        >
                          <div className="w-12 h-12 rounded-full bg-ocean-blue/80 flex items-center justify-center mb-4 shadow-lg shadow-accent/20">
                            <span className="text-white font-bold text-lg">1</span>
                          </div>
                          <h5 className="text-white font-medium text-base mb-2">Create your profile</h5>
                          <p className="text-white/70 text-xs px-2">Sign up and showcase your expertise as a travel agent</p>
                        </motion.div>
                        
                        {/* Step 2 */}
                        <motion.div 
                          className="flex flex-col items-center text-center relative z-10"
                          
                        >
                          <div className="w-12 h-12 rounded-full bg-ocean-blue/80 flex items-center justify-center mb-4 shadow-lg shadow-accent/20">
                            <span className="text-white font-bold text-lg">2</span>
                          </div>
                          <h5 className="text-white font-medium text-base mb-2">Design experiences</h5>
                          <p className="text-white/70 text-xs px-2">Craft unique journeys that showcase your travel expertise</p>
                        </motion.div>
                        
                        {/* Step 3 */}
                        <motion.div 
                          className="flex flex-col items-center text-center relative z-10"
                        
                        >
                          <div className="w-12 h-12 rounded-full bg-ocean-blue/80 flex items-center justify-center mb-4 shadow-lg shadow-accent/20">
                            <span className="text-white font-bold text-lg">3</span>
                          </div>
                          <h5 className="text-white font-medium text-base mb-2">Start earning</h5>
                          <p className="text-white/70 text-xs px-2">Receive secure payments when travelers book your experiences</p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="hidden xl:block space-y-6 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {/* Clean testimonial - no card */}
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-start">
                      <span className="text-4xl text-accent leading-none font-serif mr-3">"</span>
                      <div>
                        <p className="italic text-white opacity-90 text-sm">
                          JourneyWise transformed how I share my passion for travel with clients from around the world.
                        </p>
                        <p className="text-accent text-sm mt-2">— Maria P., Cultural Tour Guide</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Simple stats row */}
                  {/* <div className="border-t border-white/10 pt-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-accent text-2xl font-bold">97%</p>                        <p className="text-white/70 text-xs">Satisfaction</p>
                      </div>
                      <div className="text-center">
                        <p className="text-accent text-2xl font-bold">30+</p>
                        <p className="text-white/70 text-xs">Countries</p>
                      </div>
                      <div className="text-center">
                        <p className="text-accent text-2xl font-bold">10k+</p>
                        <p className="text-white/70 text-xs">Travelers</p>
                      </div>
                    </div>
                  </div> */}
                </motion.div>
              </div>
              
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