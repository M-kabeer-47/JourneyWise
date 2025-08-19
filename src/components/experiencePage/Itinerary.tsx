
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ItineraryPoint {
  id: string;
  title: string;
}

interface ItineraryProps {
  points: ItineraryPoint[];
  className?: string;
}

const Itinerary = ({ points, className }: ItineraryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; width: number }[]>([]);
  
  useEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;
      
      const pointElements = containerRef.current.querySelectorAll('.itinerary-point');
      if (pointElements.length < 2) return;
      
      const newLines: { x1: number; y1: number; x2: number; y2: number; width: number }[] = [];
      
      for (let i = 0; i < pointElements.length - 1; i++) {
        const current = pointElements[i].getBoundingClientRect();
        const next = pointElements[i + 1].getBoundingClientRect();
        const container = containerRef.current.getBoundingClientRect();
        
        const x1 = current.left + current.width / 2 - container.left;
        const y1 = current.top + current.height / 2 - container.top;
        const x2 = next.left + next.width / 2 - container.left;
        const y2 = next.top + next.height / 2 - container.top;
        
        // Calculate distance between points
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        newLines.push({ x1, y1, x2, y2, width: distance });
      }
      
      setLines(newLines);
    };
    
    updateLines();
    window.addEventListener('resize', updateLines);
    
    // Add a slight delay to let any animations complete
    const timeout = setTimeout(updateLines, 300);
    
    return () => {
      window.removeEventListener('resize', updateLines);
      clearTimeout(timeout);
    };
  }, [points]);
  
  return (
    <div ref={containerRef} className={cn("relative py-10", className)}>
      <h2 className="text-2xl font-light text-midnight-blue mb-8 text-center">Itinerary</h2>
      
      <div className="flex flex-wrap justify-around items-center relative">
        {lines.map((line, index) => {
          // Calculate angle of the line
          const angle = Math.atan2(line.y2 - line.y1, line.x2 - line.x1) * (180 / Math.PI);
          
          return (
            <div 
              key={`line-${index}`}
              className="itinerary-line"
              style={{
                width: `${line.width}px`,
                left: `${line.x1}px`,
                top: `${line.y1}px`,
                transformOrigin: 'left center',
                transform: `rotate(${angle}deg)`,
              }}
            />
          );
        })}
        
        {points.map((point, index) => (
          <div 
            key={point.id}
            className={cn(
              "itinerary-point w-12 h-12 rounded-full bg-white border-2 border-ocean-blue flex items-center justify-center mb-4 shadow-md relative",
              "transition-all duration-500 ease-in-out transform hover:scale-110"
            )}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <span className="text-ocean-blue font-medium">{index + 1}</span>
            <div className="absolute -bottom-8 whitespace-nowrap text-sm font-medium text-gray-700">
              {point.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
