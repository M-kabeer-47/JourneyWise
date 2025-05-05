'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Search } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

export default function HeroSection() {
  const ref = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <motion.section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          y: smoothY,
          scale: smoothScale,
        }}
        initial={{ y: "10%", scale: 0.9 }}
        animate={isLoaded ? { y: "0%", scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/hero.avif"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </motion.div>
      <motion.div 
        className="relative z-10 text-center text-white max-w-4xl px-4"
        style={{ opacity: smoothOpacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Explore the World <span className="text-ocean-blue"
         style={{
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
        }}>
  with Ease</span>
        </motion.h1>
        <motion.p
          className="text-xl mb-8"
        >
          Discover unique experiences, plan your journey, and create unforgettable memories.
        </motion.p>
        <motion.div
          className="relative max-w-lg mx-auto mb-8 "
        >
          <input
            type="text"
            placeholder="Where do you want to go?"
            className="w-full px-6 py-4 rounded-full text-charcoal focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-md"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-ocean-blue text-white p-3 rounded-full  transition-colors duration-300">
            <Search size={24} />
          </button>
        </motion.div>
        <motion.div
          className="flex justify-center space-x-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-ocean-blue text-white max-[380px]:px-4 px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Explore Gigs
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-ocean-blue max-[380px]:px-4 px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Plan Your Trip
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
