'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const MapPlaceholder = () => (
  <div className="bg-gray-300 w-full h-[400px] flex items-center justify-center text-gray-600">
    Interactive Map Placeholder
  </div>
)

const locations = [
  { id: 1, name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { id: 2, name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { id: 3, name: 'New York', lat: 40.7128, lon: -74.0060 },
]

export default function InteractiveMap() {
  const [activeLocation, setActiveLocation] = useState<{ id: number; name: string; lat: number; lon: number } | null>(null)

  return (
    <section className="py-16 bg-light-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Gig Locations</h2>
        <div className="relative">
          <MapPlaceholder />
          {locations.map((location) => (
            <motion.div
              key={location.id}
              className="absolute"
              style={{ top: `${50 + Math.random() * 300}px`, left: `${50 + Math.random() * 800}px` }}
              whileHover={{ scale: 1.2 }}
              onHoverStart={() => setActiveLocation(location)}
              onHoverEnd={() => setActiveLocation(null)}
            >
              <div className="w-4 h-4 bg-midnight-blue rounded-full" />
              {activeLocation === location && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-md"
                >
                  <p className="text-sm font-semibold">{location.name}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

