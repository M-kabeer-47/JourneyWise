import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomCheckbox } from '@/components/ui/CheckBox';

interface Location {
  name: string;
  code: string;
}

interface LocationSelectorProps {
  locations: Location[];
  selectedLocations: string[];
  onChange: (locations: string[]) => void;
}

export function LocationSelector({ locations, selectedLocations, onChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState<string[]>(selectedLocations);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset temp selection when selected locations change
  useEffect(() => {
    setTempSelection(selectedLocations);
  }, [selectedLocations]);

  const toggleLocation = (locationName: string) => {
    setTempSelection(prev => 
      prev.includes(locationName)
        ? prev.filter(name => name !== locationName)
        : [...prev, locationName]
    );
  };

  const applySelection = () => {
    onChange(tempSelection);
    setIsOpen(false);
  };

  const clearSelection = () => {
    setTempSelection([]);
  };

  // Group locations into 4 columns
  const chunkedLocations = () => {
    const columns = 4;
    const itemsPerColumn = Math.ceil(locations.length / columns);
    
    const result = [];
    for (let i = 0; i < columns; i++) {
      result.push(locations.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn));
    }
    return result;
  };

  return (
    <div className="w-full" ref={containerRef}>
      <button 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:border-ocean-blue transition-colors text-gray-700 bg-white hover:bg-white"
      >
        <div className="flex items-center gap-2 truncate">
          <Globe size={18} className="text-ocean-blue flex-shrink-0" />
          <span className="truncate">
            {selectedLocations.length > 0 
              ? `${selectedLocations.length} location${selectedLocations.length > 1 ? 's' : ''}` 
              : 'All Locations'}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Subtle overlay for better focus on the dropdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0"
              style={{ pointerEvents: 'none' }}
            />
            
            <motion.div 
              ref={dropdownRef}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30,
                mass: 1
              }}
              className="absolute left-12 right-0 mt-1 z-50 bg-white border border-gray-200 shadow-lg"
              style={{ 
                width: 'calc(96%)', 
                marginLeft: '-1rem', 
                marginRight: '-1rem',
                borderRadius: '0.375rem',
                borderTopLeftRadius: '0.25rem',
                borderTopRightRadius: '0.25rem'
              }}
            >
              {/* Top actions */}
              <div className="py-2 px-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Select Locations</span>
                  <button
                    onClick={clearSelection}
                    className="text-sm text-ocean-blue hover:underline"
                    type="button"
                  >
                    Clear all
                  </button>
                </div>
              </div>
              
              {/* Separator - simplified without animation */}
              <div className="h-px bg-gray-200" />
              
              {/* Nav header */}
              <div className="py-1.5 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Locations
              </div>
              
              {/* Multi-column layout of locations - without individual animations */}
              <div className="max-h-72 overflow-y-auto p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {chunkedLocations().map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col">
                      {column.map((location) => (
                        <div
                          key={location.code}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <label className="flex items-center gap-2 cursor-pointer w-full">
                            <CustomCheckbox
                              checked={tempSelection.includes(location.name)}
                              label={""}
                              onChange={() => toggleLocation(location.name)}
                              id={`loc-${location.code}`}
                            />
                            <span className="text-base leading-none mr-2" role="img" aria-label={`${location.name} flag`}>
                              {String.fromCodePoint(...location.code.split('').map(char => 127397 + char.charCodeAt(0)))}
                            </span>
                            <span className="text-sm">{location.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Separator */}
              <div className="h-px bg-gray-200" />
              
              {/* Action buttons */}
              <div className="py-2 px-4 flex justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={applySelection}
                  className="text-sm text-white bg-ocean-blue hover:bg-ocean-blue/90 px-3 py-1.5 rounded transition-colors"
                  type="button"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}