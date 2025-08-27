import React from 'react';

interface HeroSectionProps {
  title: string;
  highlightedWord: string;
  description: string;
  className?: string;
}

export default function HeroSection({ 
  title, 
  highlightedWord, 
  description, 
  className = "" 
}: HeroSectionProps) {
  return (
    <div className={`relative bg-gradient-to-r from-midnight-blue to-ocean-blue text-white ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center relative top-[40px]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-raleway">
            {title}
            <span className="text-accent"> {highlightedWord}</span>
          </h1>
          <p className="text-base text-blue-100 mb-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
