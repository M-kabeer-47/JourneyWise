import React, { useEffect, useState, useCallback } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  step?: number;
  onChange: (minValue: number, maxValue: number) => void;
  formatValue?: (value: number) => string;
}

export function RangeSlider({ 
  min, max, minValue, maxValue, step = 1, 
  onChange, formatValue = (val) => val.toString() 
}: RangeSliderProps) {
  const [localMinValue, setLocalMinValue] = useState(minValue);
  const [localMaxValue, setLocalMaxValue] = useState(maxValue);
  
  // Update local values when props change
  useEffect(() => {
    setLocalMinValue(minValue);
    setLocalMaxValue(maxValue);
  }, [minValue, maxValue]);

  // Calculate the percentage for visual elements
  const minPercent = ((localMinValue - min) / (max - min)) * 100;
  const maxPercent = ((localMaxValue - min) / (max - min)) * 100;
  
  // Handle min thumb change
  const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Math.min(parseInt(e.target.value), localMaxValue - step);
    setLocalMinValue(newMinValue);
    onChange(newMinValue, localMaxValue);
  }, [localMaxValue, onChange, step]);
  
  // Handle max thumb change
  const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Math.max(parseInt(e.target.value), localMinValue + step);
    setLocalMaxValue(newMaxValue);
    onChange(localMinValue, newMaxValue);
  }, [localMinValue, onChange, step]);

  return (
    <div className="py-6 relative">
      {/* Value display */}
      <div className="flex justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">{formatValue(localMinValue)}</span>
        <span className="text-xs font-medium text-ocean-blue">{formatValue(localMaxValue)}</span>
      </div>
      
      <div className="relative h-1">
        {/* Background track */}
        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
        
        {/* Colored range */}
        <div 
          className="absolute h-full bg-ocean-blue rounded-full"
          style={{ 
            left: `${minPercent}%`, 
            width: `${maxPercent - minPercent}%` 
          }}
        ></div>

        {/* Min thumb - using an actual range input for better accessibility */}
        <input
          type="range"
          min={min}
          max={max}
          value={localMinValue}
          step={step}
          onChange={handleMinChange}
          className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none"
          style={{
            // These styles make only the thumb clickable
            WebkitAppearance: 'none',
            appearance: 'none'
          }}
        />

        {/* Max thumb - using an actual range input for better accessibility */}
        <input
          type="range"
          min={min}
          max={max}
          value={localMaxValue}
          step={step}
          onChange={handleMaxChange}
          className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none"
          style={{
            WebkitAppearance: 'none',
            appearance: 'none'
          }}
        />
      </div>

      {/* Custom thumbs visible to users */}
      <div 
        className="absolute h-4 w-4 rounded-full bg-white border-2 border-ocean-blue z-20 -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md"
        style={{ left: `${minPercent}%`, top: '50%' }}
      ></div>
      <div 
        className="absolute h-4 w-4 rounded-full bg-white border-2 border-ocean-blue z-20 -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md" 
        style={{ left: `${maxPercent}%`, top: '50%' }}
      ></div>
      
      {/* Input field values for direct entry */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1 font-medium">Min</label>
          <input
            type="number"
            value={localMinValue}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= min && value < localMaxValue) {
                setLocalMinValue(value);
                onChange(value, localMaxValue);
              }
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
            min={min}
            max={localMaxValue - step}
            step={step}
          />
        </div>
        
        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1 font-medium">Max</label>
          <input
            type="number"
            value={localMaxValue}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value <= max && value > localMinValue) {
                setLocalMaxValue(value);
                onChange(localMinValue, value);
              }
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
            min={localMinValue + step}
            max={max}
            step={step}
          />
        </div>
      </div>
    </div>
  );
}