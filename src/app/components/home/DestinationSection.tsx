'use client'

import { useState, useEffect, useRef,createRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Utensils, Calendar, ChevronDown } from 'lucide-react'

const destinations = [
  {
    id: 1,
    name: 'Hunza',
    tagline: 'A Paradise on Earth',
    image: '/hunza.jpg',
    spots: ['Karimabad', 'Baltit Fort', 'Passu Cones'],
    foods: ['Chapshuro', 'Hunza Noodles', 'Apricot'],
    bestTime: 'April to October',
  },
  {
    id: 2,
    name: 'Goa',
    tagline: 'The Beach Paradise of India',
    image: '/goa.jpg',
    spots: ['Baga Beach', 'Fort Aguada', 'Dudhsagar Waterfalls'],
    foods: ['Fish Curry', 'Prawn Balchão', 'Vindaloo'],
    bestTime: 'November to February',
  },
  {
    id: 3,
    name: 'Paris',
    tagline: 'The City of Light',
    image: '/paris.jpeg',
    spots: ['Eiffel Tower', 'Louvre Museum', 'Montmartre'],
    foods: ['Croissants', 'Escargot', 'Macarons'],
    bestTime: 'April to June and September to November',
  },
]

const HighlightSection = ({ title, items, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <h3 className="text-xl font-semibold mb-2 flex items-center text-white">
        <Icon className="mr-2 h-6 w-6" />
        {title}
      </h3>
      <ul className="text-gray-200">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-1 flex items-center"
          >
            <span className="mr-2">•</span>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function TravelDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const destinationRefs = useRef(destinations.map(() => createRef()))

  useEffect(() => {
    const observers = destinationRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentIndex(index)
          }
        },
        { threshold: 0.5 }
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      return observer
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [])

  return (
    <div className="relative top-[50px]" >
       <motion.h2 
          className="text-5xl font-bold mb-12 text-center relative top-[0px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent text-midnight-blue">
            Hot Destinations
          </span>
        </motion.h2>
      {destinations.map((destination, index) => (
        <div
          key={destination.id}
          ref={destinationRefs.current[index]}
          className="h-screen relative overflow-hidden snap-start max-[768px]:min-h-[800px]"
        >
          <Image
            src={destination.image}
            alt={destination.name}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 top-[60px] md:top-[0px]  ">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 text-center relative"
            >
              {destination.name}
            </motion.h2>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl md:text-3xl mb-8 text-center"
            >
              {destination.tagline}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl max-[768px]:flex max-[768px]:flex-wrap max-[768px]:justify-between max-[768px]:gap-y-[2px]">
              <HighlightSection title="Top Spots" items={destination.spots} icon={MapPin} />
              <HighlightSection title="Famous Foods" items={destination.foods} icon={Utensils} />
              <HighlightSection title="Best Time to Visit" items={[destination.bestTime]} icon={Calendar} />
            </div>
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              onClick={()=>alert("Explore")}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 bg-white text-black rounded-full font-semibold text-lg shadow-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              Explore {destination.name}
            </motion.button>
          </div>
        </div>
      ))}
      {currentIndex < destinations.length - 1 && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-white w-8 h-8" />
        </motion.div>
      )}
    </div>
  )
}

