import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, Tag, Clock } from 'lucide-react';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { FilterSection } from '@/components/experiences/FilterSection';
import { CustomCheckbox } from '@/components/ui/CheckBox';

// Create a custom theme to match your site's colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0077B6', // ocean-blue color
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#0077B6',
          height: 4,
        },
        thumb: {
          height: 18,
          width: 18,
          backgroundColor: '#fff',
          border: '2px solid #0077B6',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          '&:focus, &:hover, &.Mui-active': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
        track: {
          height: 4,
          borderRadius: 2,
        },
        rail: {
          height: 4,
          borderRadius: 2,
          backgroundColor: '#0077B6',
        },
        valueLabel: {
          backgroundColor: '#0077B6',
        },
      },
    },
  },
});

interface FilterValues {
  isAvailable: boolean;
  minPrice: number;
  maxPrice: number;
  minDuration: number;
  maxDuration: number;
  tags: string[];
}

interface ExperienceFiltersProps {
  initialValues: FilterValues;
  tagOptions: string[];
  onApplyFilters: (filters: FilterValues) => void;
  onClearFilters: () => void;
}

export default function ExperienceFilters({ 
  initialValues, 
  tagOptions, 
  onApplyFilters, 
  onClearFilters 
}: ExperienceFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>(initialValues);
  
  // Update component state when props change
  useEffect(() => {
    setFilters(initialValues);
  }, [initialValues]);
  
  // Handle filter changes
  const handleFilterChange = (key: keyof FilterValues, value: any) => {
    if(value === ""){
      value = "";
    }
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Toggle tags
  const handleTagToggle = (tag: string) => {
    setFilters(prev => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
  };
  
  // Format helpers for sliders
  const formatPriceLabel = (value: number) => {
    return `$${value}`;
  };

  const formatDurationLabel = (value: number) => {
    return `${value} ${value === 1 ? 'day' : 'days'}`;
  };
  
  // Handle slider changes
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      handleFilterChange('minPrice', newValue[0]);
      handleFilterChange('maxPrice', newValue[1]);
    }
  };

  const handleDurationChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      handleFilterChange('minDuration', newValue[0]);
      handleFilterChange('maxDuration', newValue[1]);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-white rounded-xl shadow-md p-5 sticky top-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button 
            onClick={onClearFilters}
            className="text-sm text-ocean-blue hover:text-ocean-blue/80"
            type="button"
          >
            Clear all
          </button>
        </div>
        
        {/* Filters Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <FilterSection title="Availability">
            <label className="flex items-center gap-2 cursor-pointer">
              <CustomCheckbox 
                checked={filters.isAvailable} 
                onChange={() => handleFilterChange('isAvailable', !filters.isAvailable)}
                id="availability-filter"
                label="Show only available experiences"
              />
            </label>
          </FilterSection>
          
          {/* Price Range with Material UI Slider */}
          <FilterSection title="Price Range" icon={<DollarSign size={16} />}>
            <div className="py-6">
              <div className="mb-2 flex justify-between">
                <span className="text-xs font-medium text-gray-500">{formatPriceLabel(filters.minPrice)}</span>
                <span className="text-xs font-medium text-ocean-blue">{formatPriceLabel(filters.maxPrice)}</span>
              </div>
              
              <Slider
                getAriaLabel={() => 'Price range'}
                value={[filters.minPrice, filters.maxPrice]}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                getAriaValueText={formatPriceLabel}
                valueLabelFormat={formatPriceLabel}
                min={1}
                max={10000}
                step={50}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Min Price</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={14} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice',(e.target.value))}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
                    min="1"
                    max={filters.maxPrice}
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Max Price</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={14} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', (e.target.value))}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
                    min={filters.minPrice}
                  />
                </div>
              </div>
            </div>
          </FilterSection>
          
          {/* Duration with Material UI Slider */}
          <FilterSection title="Duration" icon={<Calendar size={16} />}>
            <div className="py-6">
              <div className="mb-2 flex justify-between">
                <span className="text-xs font-medium text-gray-500">{formatDurationLabel(filters.minDuration)}</span>
                <span className="text-xs font-medium text-ocean-blue">{formatDurationLabel(filters.maxDuration)}</span>
              </div>
              
              <Slider
                getAriaLabel={() => 'Duration range'}
                value={[filters.minDuration, filters.maxDuration]}
                onChange={handleDurationChange}
                valueLabelDisplay="auto"
                getAriaValueText={formatDurationLabel}
                valueLabelFormat={formatDurationLabel}
                min={1}
                max={30}
                step={1}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Min Days</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={14} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={filters.minDuration}
                    onChange={(e) => handleFilterChange('minDuration', (e.target.value))}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
                    min="1"
                    max={filters.maxDuration}
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Max Days</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={14} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={filters.maxDuration}
                    onChange={(e) => handleFilterChange('maxDuration',(e.target.value))}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
                    min={filters.minDuration}
                  />
                </div>
              </div>
            </div>
          </FilterSection>
          
          {/* Experience Types */}
          <FilterSection title="Experience Types" icon={<Tag size={16} />}>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filters.tags.includes(tag)
                      ? 'bg-midnight-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </FilterSection>
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-ocean-blue text-white font-medium rounded-lg hover:bg-ocean-blue/90 transition-colors shadow-sm"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </ThemeProvider>
  );
}