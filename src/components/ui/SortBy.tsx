import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SortOption = {
  key: string;
  label: string;
}

interface SortByProps {
  options: SortOption[];
  activeSort: {
    key: string;
    direction: 'ascending' | 'descending';
  };
  onSortChange: (key: string, direction: 'ascending' | 'descending') => void;
  className?: string;
}

export default function SortBy({ options, activeSort, onSortChange, className = '' }: SortByProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get active option label
  const activeLabel = options.find(option => option.key === activeSort.key)?.label || 'Sort by';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:border-ocean-blue transition-colors text-gray-700 bg-white w-full ${className}`}
      >
        <span className="truncate">Sort by: {activeLabel}</span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
            style={{ minWidth: '100%', width: 'max-content' }}
          >
            {options.map((option) => (
              <div key={option.key} className="px-1">
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-left hover:bg-gray-50 rounded-md"
                  onClick={() => {
                    const newDirection = 
                      activeSort.key === option.key && activeSort.direction === 'ascending'
                        ? 'descending'
                        : 'ascending';
                    onSortChange(option.key, newDirection);
                    setIsOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  {activeSort.key === option.key && (
                    <span className="text-ocean-blue">
                      {activeSort.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}