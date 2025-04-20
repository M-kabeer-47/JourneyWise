import { useState,useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/utils/shadcn/utils'
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface EnhancedImagesCarouselProps {
  images: string[];
  className?: string;
}

const EnhancedImagesCarousel = ({ images, className }: EnhancedImagesCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  
  // Update the active index when the carousel changes
  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  
  if (!images.length) {
    return (
      <div className={cn("rounded-xl bg-gray-100 p-4 flex items-center justify-center", className)}>
        <div className="text-gray-400 flex flex-col items-center">
          <ImageIcon className="h-10 w-10 mb-2" />
          <p>No images available</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn("space-y-4", className)}>
      {/* Main image carousel */}
      <Carousel 
        setApi={setApi}
        className="relative rounded-xl overflow-hidden bg-gray-100 max-h-[500px] shadow-md"
        opts={{
          loop: true,
          skipSnaps: false,
          duration: 20
        }}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="h-full w-full">
                <img
                  src={image}
                  alt={"Image " + (index + 1)}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Image counter */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent h-16 z-10">
          <div className="absolute bottom-4 left-4 text-white font-medium">
            <p className="text-sm tracking-wide">{activeIndex + 1} / {images.length}</p>
          </div>
        </div>
        
        {/* Custom prev/next buttons to match the design */}
        <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full  backdrop-blur-sm flex items-center justify-center transition-all duration-200" />
        <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full  backdrop-blur-sm flex items-center justify-center transition-all duration-200" />
      </Carousel>
      
      {/* Thumbnails */}
      <div className="px-1">
        <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "flex-shrink-0 h-[60px] w-[65px] sm:h-16 sm:w-20 rounded-md overflow-hidden cursor-pointer transition-all duration-300",
                activeIndex === index 
                  ? "ring-2 ring-ocean-blue scale-105 shadow" 
                  : "filter brightness-75 hover:brightness-90 hover:scale-105"
              )}
              onClick={() => {
                // Scroll to this slide
                api?.scrollTo(index);
              }}
            >
              <motion.img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedImagesCarousel;