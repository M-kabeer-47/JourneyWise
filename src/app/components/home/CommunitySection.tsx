'use client'

import { motion } from 'framer-motion'

export default function CommunitySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Travel Community</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with fellow travelers, share your experiences, and get inspired for your next adventure.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-ocean-blue text-white px-8 py-3 rounded-full text-lg font-semibold"
        >
          Explore Community Forums
        </motion.button>
      </div>
    </section>
  )
}

