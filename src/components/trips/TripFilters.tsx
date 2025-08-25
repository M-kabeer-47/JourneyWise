"use client";

import React, { useState, useEffect } from 'react';
import { DollarSign, Users, MapPin, Route } from 'lucide-react';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { FilterSection } from '@/components/experiences/FilterSection';

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
  minBudget: number;
  maxBudget: number;
  minGroupSize: number;
  maxGroupSize: number;
  minDistance: number;
  maxDistance: number;
  waypoints: string[];
}

interface TripFiltersProps {
  initialValues: FilterValues;
  onApplyFilters: (filters: FilterValues) => void;
  onClearFilters: () => void;
}

export default function TripFilters({ 
  initialValues, 
  onApplyFilters, 
  onClearFilters 
}: TripFiltersProps) {
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
  

  // Handle waypoint input
  const handleWaypointAdd = (waypoint: string) => {
    if (waypoint.trim() && !filters.waypoints.includes(waypoint.trim())) {
      setFilters(prev => ({
        ...prev,
        waypoints: [...prev.waypoints, waypoint.trim()]
      }));
    }
  };

  const handleWaypointRemove = (waypoint: string) => {
    setFilters(prev => ({
      ...prev,
      waypoints: prev.waypoints.filter(w => w !== waypoint)
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
  };
  
  // Format helpers for sliders
  const formatBudgetLabel = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const formatGroupSizeLabel = (value: number) => {
    return `${value} ${value === 1 ? 'person' : 'people'}`;
  };

  const formatDistanceLabel = (value: number) => {
    return `${value.toLocaleString()} km`;
  };
  
  // Handle slider changes
  const handleBudgetChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      handleFilterChange('minBudget', newValue[0]);
      handleFilterChange('maxBudget', newValue[1]);
    }
  };

  const handleGroupSizeChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      handleFilterChange('minGroupSize', newValue[0]);
      handleFilterChange('maxGroupSize', newValue[1]);
    }
  };

  const handleDistanceChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      handleFilterChange('minDistance', newValue[0]);
      handleFilterChange('maxDistance', newValue[1]);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-white rounded-xl shadow-md p-5 sticky">
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
          
          {/* Budget Range with Material UI Slider */}
          <FilterSection title="Budget Range" icon={<DollarSign size={16} />}>
            <div className="py-6">
              <div className="mb-2 flex justify-between">
                <span className="text-xs font-medium text-gray-500">{formatBudgetLabel(filters.minBudget)}</span>
                <span className="text-xs font-medium text-ocean-blue">{formatBudgetLabel(filters.maxBudget)}</span>
              </div>
              
              <Slider
                getAriaLabel={() => 'Budget range'}
                value={[filters.minBudget, filters.maxBudget]}
                onChange={handleBudgetChange}
                valueLabelDisplay="auto"
                getAriaValueText={formatBudgetLabel}
                valueLabelFormat={formatBudgetLabel}
                min={0}
                max={100000}
                step={500}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Min Budget</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={14} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={filters.minBudget}
                    onChange={(e) => handleFilterChange('minBudget',(e.target.value))}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
                    min="0"
                    max={filters.maxBudget}
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Max Budget</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={14} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={filters.maxBudget}
                    onChange={(e) => handleFilterChange('maxBudget', (e.target.value))}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
                    min={filters.minBudget}
                  />
                </div>
              </div>
            </div>
          </FilterSection>
          
          {/* Group Size with Material UI Slider */}
          <FilterSection title="Group Size" icon={<Users size={16} />}>
            <div className="py-6">
              <div className="mb-2 flex justify-between">
                <span className="text-xs font-medium text-gray-500">{formatGroupSizeLabel(filters.minGroupSize)}</span>
                <span className="text-xs font-medium text-ocean-blue">{formatGroupSizeLabel(filters.maxGroupSize)}</span>
              </div>
              
              <Slider
                getAriaLabel={() => 'Group size range'}
                value={[filters.minGroupSize, filters.maxGroupSize]}
                onChange={handleGroupSizeChange}
                valueLabelDisplay="auto"
                getAriaValueText={formatGroupSizeLabel}
                valueLabelFormat={formatGroupSizeLabel}
                min={1}
                max={20}
                step={1}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Min People</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users size={14} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={filters.minGroupSize}
                    onChange={(e) => handleFilterChange('minGroupSize', (e.target.value))}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
                    min="1"
                    max={filters.maxGroupSize}
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Max People</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users size={14} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={filters.maxGroupSize}
                    onChange={(e) => handleFilterChange('maxGroupSize',(e.target.value))}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
                    min={filters.minGroupSize}
                  />
                </div>
              </div>
            </div>
          </FilterSection>

          {/* Distance Range with Material UI Slider */}
          <FilterSection title="Distance" icon={<MapPin size={16} />}>
            <div className="py-6">
              <div className="mb-2 flex justify-between">
                <span className="text-xs font-medium text-gray-500">{formatDistanceLabel(filters.minDistance)}</span>
                <span className="text-xs font-medium text-ocean-blue">{formatDistanceLabel(filters.maxDistance)}</span>
              </div>
              
              <Slider
                getAriaLabel={() => 'Distance range'}
                value={[filters.minDistance, filters.maxDistance]}
                onChange={handleDistanceChange}
                valueLabelDisplay="auto"
                getAriaValueText={formatDistanceLabel}
                valueLabelFormat={formatDistanceLabel}
                min={0}
                max={10000}
                step={100}
                className='overflow-visible'
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Min Distance (km)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={14} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={filters.minDistance}
                    onChange={(e) => handleFilterChange('minDistance', (e.target.value))}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
                    min="0"
                    max={filters.maxDistance}
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 font-medium">Max Distance (km)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={14} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    value={filters.maxDistance}
                    onChange={(e) => handleFilterChange('maxDistance',(e.target.value))}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
                    min={filters.minDistance}
                  />
                </div>
              </div>
            </div>
          </FilterSection>
          

          {/* Waypoints */}
          <FilterSection title="Waypoints" icon={<Route size={16} />}>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Add waypoint (e.g., Paris, Tokyo)"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleWaypointAdd(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue text-gray-700 text-sm"
              />
              
              {filters.waypoints && filters.waypoints.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.waypoints.map((waypoint) => (
                    <div
                      key={waypoint}
                      className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                    >
                      <span>{waypoint}</span>
                      <button
                        type="button"
                        onClick={() => handleWaypointRemove(waypoint)}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
