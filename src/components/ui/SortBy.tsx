"use client";
import React, { useState } from 'react';
import { SlidersHorizontal, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';

export type SortOption = {
  key: string;
  label: string;
};

interface SortByProps {
  options: SortOption[];
  activeSort: {
    key: string;
    direction: 'ascending' | 'descending';
  };
  onSortChange: (key: string, direction: 'ascending' | 'descending') => void;
  className?: string;
}

const SortBy: React.FC<SortByProps> = ({ 
  options, 
  activeSort, 
  onSortChange,
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (key: string) => {
    if (activeSort.key === key) {
      onSortChange(key, activeSort.direction === 'ascending' ? 'descending' : 'ascending');
    } else {
      onSortChange(key, 'descending');
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 sm:px-4 py-2.5 bg-white rounded-lg border border-gray-200 text-gray-700"
      >
        <SlidersHorizontal size={18} className="mr-2" />
        <span className="font-medium">Sort</span>
        <ChevronRight size={16} className={`ml-1 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => handleSort(option.key)}
              className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-50"
            >
              <span>{option.label}</span>
              {activeSort.key === option.key && (
                activeSort.direction === 'ascending' ? 
                  <ArrowUp size={14} /> : 
                  <ArrowDown size={14} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;