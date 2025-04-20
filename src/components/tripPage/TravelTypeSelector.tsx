
import React from 'react';
import { cn } from '@/lib/utils';

interface TravelTypeSelectorProps {
  selectedType: 'solo' | 'couple' | 'family' | null;
  onSelect: (type: 'solo' | 'couple' | 'family') => void;
  className?: string;
}

const TravelTypeSelector = ({ selectedType, onSelect, className }: TravelTypeSelectorProps) => {
  const buttonClasses = "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300";
  const activeClasses = "bg-ocean-blue text-white shadow-md";
  const inactiveClasses = "bg-white text-gray-600 hover:bg-gray-100";
  
  return (
    <div className={cn("flex gap-2", className)}>
      <button 
        className={cn(buttonClasses, selectedType === 'solo' ? activeClasses : inactiveClasses)}
        onClick={() => onSelect('solo')}
      >
        Solo
      </button>
      <button 
        className={cn(buttonClasses, selectedType === 'couple' ? activeClasses : inactiveClasses)}
        onClick={() => onSelect('couple')}
      >
        Couple
      </button>
      <button 
        className={cn(buttonClasses, selectedType === 'family' ? activeClasses : inactiveClasses)}
        onClick={() => onSelect('family')}
      >
        Family
      </button>
    </div>
  );
};

export default TravelTypeSelector;
