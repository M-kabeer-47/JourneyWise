'use client'

import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Link from 'next/link'
const gigs = [
  { id: 1, title: 'Paris Photography Tour', description: 'Capture the beauty of Paris with a professional photographer', price: 150, image: '/paris.jpg', user: { name: 'Sophie Dubois', image: '/user1.jpg' }, rating: 4.8, reviews: 120, highlights: ['Professional equipment provided', '3-hour tour', 'Eiffel Tower views'] },
  { id: 2, title: 'Tokyo Food Adventure', description: 'Explore the culinary delights of Tokyo', price: 120, image: '/tokyo.jpg', user: { name: 'Hiroshi Tanaka', image: '/user2.jpg' }, rating: 4.9, reviews: 85, highlights: ['5 food stops', 'Local guide', 'Sake tasting'] },
  { id: 3, title: 'New York City Walking Tour', description: 'Discover the hidden gems of NYC on foot', price: 80, image: '/nyc.jpg', user: { name: 'Emily Johnson', image: '/user3.jpg' }, rating: 4.7, reviews: 150, highlights: ['Off-the-beaten-path locations', '4-hour tour', 'Small group size'] },
  { id: 4, title: 'Bali Yoga Retreat', description: 'Relax and rejuvenate in beautiful Bali', price: 200, image: '/bali.jpg', user: { name: 'Made Surya', image: '/user4.jpg' }, rating: 5.0, reviews: 75, highlights: ['Daily yoga sessions', 'Meditation workshops', 'Healthy meals included'] },
]

export default function FeaturedGigs() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation()

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(gigs.length / 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(gigs.length / 3)) % Math.ceil(gigs.length / 3))
  }

  useEffect(() => {
    controls.start({ x: `${-currentIndex * 100}%` })
  }, [currentIndex, controls])

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent text-midnight-blue">
            Featured Experiences
          </span>
        </motion.h2>
        <div className="relative">
          <motion.div 
            className="flex"
            animate={controls}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {gigs.map((gig, index) => (
              <motion.div
                key={gig.id}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={""}>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:shadow-xl  h-full flex flex-col">
                  <div className="relative h-48">
                    <Image src={gig.image} alt={gig.title} layout="fill" objectFit="cover" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2 text-charcoal">{gig.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{gig.description}</p>
                      <div className="flex items-center mb-4">
                        <Image src={gig.user.image} alt={gig.user.name} width={40} height={40} className="rounded-full mr-3" />
                        <div>
                          <p className="font-semibold text-charcoal">{gig.user.name}</p>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-600">{gig.rating} ({gig.reviews})</span>
                          </div>
                        </div>
                      </div>
                    
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-ocean-blue">${gig.price}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-ocean-blue text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

