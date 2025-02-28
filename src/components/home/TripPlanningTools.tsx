'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Compass, BookOpen } from 'lucide-react'
import { toggleNavbar } from '@/lib/redux/slices/navbar'
import { useEffect,useRef } from 'react'
import { useAppDispatch } from '@/lib/hooks/redux'
const tools = [
  { 
    id: 1, 
    name: 'Itinerary Builder', 
    icon: CalendarDays, 
    description: 'Craft your dream adventure day by day with our intuitive interface.',
    features: ['Customizable templates', 'AI-powered suggestions', 'Offline access', 'Export to PDF'],
    buttonText: 'Start Planning',
  },
  {   
    id: 2, 
    name: 'Experience Explorer',
    icon: Compass,
    description: 'Discover and book unforgettable experiences curated by local experts.',
    features: ['Personalized recommendations', 'Verified reviews', 'Instant booking', 'Virtual tours'],
    buttonText: 'Explore Experiences',
  },
  { 
    id: 3,
    name: 'Travel Insights',
    icon: BookOpen,
    description: 'Gain valuable insights and tips from our community of seasoned travelers.',
    features: ['Destination guides', 'Packing lists', 'Budget calculators', 'Cultural etiquette tips'],
    buttonText: 'Share Your Story',
  },
]


export default function TripPlanningTools() {
  const dispatch = useAppDispatch()
  const sectionRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // dispatch(toggleNavbar(true))  
          
          // Show navbar
        } 
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [dispatch])

  return (
    <motion.section 
    ref={sectionRef}
      className="py-32 bg-gray-50 relative top-[140px] "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="px-12">
        <h2 className="text-4xl font-bold mb-16 text-center text-charcoal">
          Elevate Your Travel Experience
        </h2>
        <div className="grid grid-cols-1 min-[800px]:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg border-2 border-ocean-blue border-opacity-20 min-h-[480px] flex flex-col"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className="bg-white bg-opacity-10 p-4 rounded-full mr-5">
                    <tool.icon size={32} className="text-ocean-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal">{tool.name}</h3>
                </div>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{tool.description}</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-base text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-ocean-blue text-white py-3 rounded-[25px] shadow-sm hover:bg-accent transition-all duration-300 ease-in-out text-lg font-semibold"
                >
                  {tool.buttonText}
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

