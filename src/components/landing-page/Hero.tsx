"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, User } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <section className="relative bg-gradient-to-br from-midnight-blue/5 to-ocean-blue/5 pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-blue mb-6 font-raleway leading-tight">
              Book professional travel experiences.{" "}
              <span className="text-ocean-blue">
                Plan with community routes.
              </span>{" "}
              Travel smarter.
            </h1>

            <p className="text-lg md:text-xl text-charcoal mb-8 leading-relaxed font-geist">
              JourneyWise connects travelers with licensed agents and a global
              community to discover, plan, and book unforgettable trips — all in
              one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSearchModal(true)}
                className="bg-midnight-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-midnight-blue/90 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-midnight-blue/50"
              >
                <Search size={20} />
                Explore Experiences
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  document
                    .getElementById("route-explorer")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-2 border-midnight-blue text-midnight-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-midnight-blue/5 transition-colors focus:outline-none focus:ring-2 focus:ring-midnight-blue/50"
              >
                Find Route Suggestions
              </motion.button>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Floating Experience Card */}
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                }}
                className="absolute top-4 right-4 bg-white rounded-xl p-4 shadow-lg max-w-[280px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-ocean-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-charcoal">
                        4.9
                      </span>
                      <span className="text-xs text-gray-500">(127)</span>
                    </div>
                    <h4 className="font-semibold text-midnight-blue text-sm mb-1">
                      Swiss Alps Adventure
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      By Alpine Tours Pro
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-ocean-blue">
                        $1,299
                      </span>
                      <button className="bg-midnight-blue text-white px-3 py-1 rounded text-xs font-medium hover:bg-midnight-blue/90 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Route Overlay */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-ocean-blue" />
                  <span className="text-sm font-medium text-charcoal">
                    Community Route: Zurich → Interlaken
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full"
          >
            <h3 className="text-2xl font-bold text-midnight-blue mb-6">
              Find Your Perfect Experience
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              />
              <div className="flex gap-4">
                <input
                  type="date"
                  className="flex-1 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                />
                <select className="flex-1 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue">
                  <option>Experience Type</option>
                  <option>Adventure</option>
                  <option>Culture</option>
                  <option>Food & Wine</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-midnight-blue text-white p-4 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors">
                  Search Experiences
                </button>
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="px-6 py-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
