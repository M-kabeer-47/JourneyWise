'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ExperienceCard from './ExperienceCard';
import ExperienceCardSkeleton from '@/components/skeletons/ExperienceCardSkeleton';
import { Experience  } from '@/lib/types/Experience';
import { Button } from '@/components/ui/button';

interface ExperienceData {
  experience: Experience;
  agent: {
    avatar: string | undefined;
    name: string;
  };
}

interface ExperienceCarouselProps {
  title: string;
  experiences?: ExperienceData[];  
  sectionRef?: React.RefObject<HTMLElement>;
  isLoading?: boolean;
}

export default function ExperienceCarousel({ 
  title, 
  experiences = [], // Default to empty array
  sectionRef,
  isLoading = false
}: ExperienceCarouselProps) {

  
  // Initialize with a function to get the correct initial value
  const [cardsPerView, setCardsPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  

  const updateCardsPerView = () => {
    const width = window.innerWidth;
    if (width >= 1536) setCardsPerView(4); // 2xl
    else if (width >= 1280) setCardsPerView(3); // xl
    else if (width >= 768) setCardsPerView(2); // md
    else setCardsPerView(1); // mobile
  };
  // Update cards per view based on screen size
  useEffect(() => {
    

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Only calculate these values when not loading
  const totalCards = experiences.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);
  const totalGroups = Math.ceil(totalCards / cardsPerView) || 1;

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexValue = prevIndex - 1;
      return prevIndexValue < 0 ? maxIndex : prevIndexValue;
    });
  };

  useEffect(() => {
    if (isLoading) return;

    const cardWidth = 100 / cardsPerView;
    const movePercentage = currentIndex * cardWidth;
    
    controls.start({ 
      x: `-${movePercentage}%`,
      transition: { 
        type: "spring", 
        stiffness: 70,
        damping: 20,
        mass: 1
      }
    });
  }, [currentIndex, controls, cardsPerView, isLoading]);

  // Create skeleton cards array for loading state
  const skeletonCards = Array(cardsPerView).fill(null).map((_, i) => i);

  return (
    <section 
      ref={sectionRef || null}
      className="py-20 bg-gradient-to-b from-midnight-blue/5 to-ocean-blue/5 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {isLoading ? (
            <>
              <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto animate-pulse mb-4" />
              <div className="mt-4 w-24 h-1 bg-gray-300 mx-auto rounded-full animate-pulse" />
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-midnight-blue to-ocean-blue bg-clip-text text-transparent">
                {title}
              </h2>
              <div className="mt-4 w-24 h-1 bg-gradient-to-r from-midnight-blue to-ocean-blue mx-auto rounded-full" />
            </>
          )}
        </motion.div>

        <div className="relative max-w-[1400px] mx-auto" ref={containerRef}>
          <div className="overflow-hidden px-2">
            {isLoading ? (
              // Skeleton loading state - simple fixed number based on screen size
              <div className="flex">
                {skeletonCards.map((index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="flex-shrink-0 flex-grow-0 px-4"
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <ExperienceCardSkeleton />
                  </div>
                ))}
              </div>
            ) : (
              // Actual content with animation
              <motion.div 
                className="flex"
                animate={controls}
                initial={false}
              >
                {experiences.length > 0 ? experiences.map((experience, index) => (
                  <motion.div
                    key={experience.experience.id || `experience-${index}`}
                    className="flex-shrink-0 flex-grow-0 px-4"
                    style={{ width: `${100 / cardsPerView}%` }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="h-full transform transition-all duration-300 hover:shadow-xl rounded-xl overflow-hidden">
                      <ExperienceCard experience={experience.experience} agent={experience.agent} />
                    </div>
                  </motion.div>
                )) : (
                  <div className="w-full text-center py-12">
                    <p className="text-gray-500">No experiences available</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {!isLoading && totalCards > cardsPerView && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm border-ocean-blue/10 shadow-lg hover:bg-white hover:border-ocean-blue rounded-full z-10 w-10 h-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 text-ocean-blue" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm border-ocean-blue/10 shadow-lg hover:bg-white hover:border-ocean-blue rounded-full z-10 w-10 h-10"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 text-ocean-blue" />
              </Button>
            </>
          )}
          
          {!isLoading && totalGroups > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalGroups }).map((_, idx) => {
                const isActive = Math.floor(currentIndex / cardsPerView) === idx;
                
                return (
                  <button
                    key={`page-${idx}`}
                    onClick={() => setCurrentIndex(idx * cardsPerView)}
                    className={`transition-all duration-300 rounded-full ${
                      isActive 
                        ? 'bg-ocean-blue w-8 h-1.5' 
                        : 'bg-gray-200 w-2.5 h-1.5 hover:bg-gray-300 hover:w-4'
                    }`}
                    aria-label={`Go to slide group ${idx + 1}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}