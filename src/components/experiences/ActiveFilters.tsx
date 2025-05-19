// components/experiences/ActiveFilters.tsx
import React from 'react';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  filters: {
    isAvailable: boolean;
    minPrice: number;
    maxPrice: number;
    minDuration: number;
    maxDuration: number;
    tags: string[];
    locations: string[];
  };
  onClearTag: (tag: string) => void;
  onClearLocation: (location: string) => void;
  onClearAllFilters: () => void;
}

export function ActiveFilters({ 
  filters, 
  onClearTag, 
  onClearLocation, 
  onClearAllFilters 
}: ActiveFiltersProps) {
  // Count active filters
  const hasActiveFilters = 
    filters.isAvailable || 
    filters.minPrice > 1 || 
    filters.maxPrice < 10000 || 
    filters.minDuration > 1 || 
    filters.maxDuration < 30 || 
    filters.tags.length > 0 || 
    filters.locations.length > 0;
    
  if (!hasActiveFilters) return null;
  
  return (
    <div className="flex flex-wrap gap-2 items-center py-2">
      {filters.tags.map(tag => (
        <div 
          key={tag} 
          className="flex items-center bg-midnight-blue/10 text-midnight-blue rounded-full py-1 pl-3 pr-1.5 text-xs font-medium"
        >
          <span>{tag}</span>
          <button 
            onClick={() => onClearTag(tag)}
            className="ml-1 p-0.5 rounded-full hover:bg-midnight-blue/20"
            type="button"
          >
            <X size={12} />
          </button>
        </div>
      ))}
      
      {filters.locations.map(location => (
        <div 
          key={location} 
          className="flex items-center bg-midnight-blue/10 text-midnight-blue rounded-full py-1 pl-3 pr-1.5 text-xs font-medium"
        >
          <span>{location}</span>
          <button 
            onClick={() => onClearLocation(location)}
            className="ml-1 p-0.5 rounded-full hover:bg-midnight-blue/20"
            type="button"
          >
            <X size={12} />
          </button>
        </div>
      ))}
      
      {(filters.isAvailable || filters.minPrice > 1 || filters.maxPrice < 10000 || 
        filters.minDuration > 1 || filters.maxDuration < 30) && (
        <button
          onClick={onClearAllFilters}
          className="text-xs text-midnight-blue font-medium hover:underline"
          type="button"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}