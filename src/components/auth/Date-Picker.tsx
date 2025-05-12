import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, AlertCircle, ChevronDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/shadcn/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
  error?: string;
}

export default function DatePicker({ value, onChange, label, error }: DatePickerProps) {
  // Track dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = {
    month: useRef<HTMLDivElement>(null),
    day: useRef<HTMLDivElement>(null),
    year: useRef<HTMLDivElement>(null)
  };

  // State for individual date parts
  const [selectedDate, setSelectedDate] = useState<{
    day: string;
    month: string;
    year: string;
    formatted: string;
  }>({
    day: '',
    month: '',
    year: '',
    formatted: ''
  });
  
  // Initialize component if a value is provided
  useEffect(() => {
    if (value && value !== selectedDate.formatted) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          const newDay = String(date.getDate());
          const newMonth = String(date.getMonth());
          const newYear = String(date.getFullYear());
          const formattedDate = formatDate(newYear, newMonth, newDay);
          
          // Only update if something changed
          if (formattedDate !== selectedDate.formatted) {
            setSelectedDate({
              day: newDay,
              month: newMonth,
              year: newYear,
              formatted: formattedDate
            });
          }
        }
      } catch (e) {
        console.error("Error parsing date:", e);
      }
    }
  }, [value]);

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1)
  }));
  
  const months = [
    { value: '1', label: 'January ' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i)
  }));

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdown) {
        const currentRef = dropdownRefs[openDropdown as keyof typeof dropdownRefs].current;
        if (currentRef && !currentRef.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // Format date parts into a standardized string format
  const formatDate = (year: string, month: string, day: string): string => {
    if (!day || !month || !year) return '';
    
    try {
      // Ensure all parts are numbers
      const y = parseInt(year);
      const m = parseInt(month);
      const d = parseInt(day);
      
      // Format to YYYY-MM-DD
      const newDate = new Date(y, m, d);
      if (isValidDate(day, month, year)) {
        return newDate.toISOString().split('T')[0]; // Returns YYYY-MM-DD
      }
      return '';
    } catch (error) {
      console.error("Date formatting error:", error);
      return '';
    }
  };

  // Update date part and propagate changes to parent if needed
  const updateDatePart = (type: string, value: string) => {
    let newState = { ...selectedDate };
    
    if (type === 'day') newState.day = value;
    else if (type === 'month') newState.month = value;
    else if (type === 'year') newState.year = value;
    
    // Only format and update if we have all parts
    if (newState.day && newState.month && newState.year) {
      const formattedDate = formatDate(newState.year, newState.month, newState.day);
      newState.formatted = formattedDate;
      
      // Update state and notify parent if valid
      setSelectedDate(newState);
      if (formattedDate && formattedDate !== value) {
        onChange(formattedDate);
      }
    } else {
      // Just update our internal state
      setSelectedDate(newState);
    }
    
    // Close dropdown after selection
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const isValidDate = (d: string, m: string, y: string): boolean => {
    if (!d || !m || !y) return true;
    
    try {
      const date = new Date(parseInt(y), parseInt(m), parseInt(d));
      return date.getDate() === parseInt(d) && 
             date.getMonth() === parseInt(m) && 
             date.getFullYear() === parseInt(y) &&
             !isNaN(date.getTime());
    } catch {
      return false;
    }
  };

  const getMonthName = (monthValue: string) => {
    const foundMonth = months.find(m => m.value === monthValue);
    return foundMonth ? foundMonth.label : 'Month';
  };

  return (
    <div className="space-y-2">
      <Label 
        htmlFor="dob" 
        className={cn(
          "text-sm font-medium text-gray-700",
          error && "text-red-500"
        )}
      >
        {label}<span className="text-red-500">*</span>
      </Label>
      
      <div className="flex items-start gap-3 ">
        {/* Month dropdown */}
        <div className="relative w-[50%]" ref={dropdownRefs.month} >
          <div className="absolute left-3 top-3 text-gray-400">
            <CalendarIcon className="h-4 w-4" />
          </div>
          <button
            type="button"
            onClick={() => toggleDropdown('month')}
            className={cn(
              "w-full h-10 pl-10 pr-3 rounded-lg text-left",
              "transition-all duration-200 outline-none border text-sm",
              error ? "border-red-500 bg-red-50" : "border-gray-200 bg-white",
              openDropdown === 'month' ? "border-ocean-blue ring-2 ring-ocean-blue/20" : ""
            )}
          >
            {selectedDate.month ? getMonthName(selectedDate.month) : 'Month'}
            <ChevronDown 
              size={16} 
              className={cn(
                "absolute right-3 top-3 transition-transform duration-200",
                openDropdown === 'month' ? "transform rotate-180" : ""
              )} 
            />
          </button>
          
          <AnimatePresence>
            {openDropdown === 'month' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 overflow-auto"
              >
                {months.map(option => (
                  <div
                    key={option.value}
                    className={cn(
                      "px-3 py-2 cursor-pointer text-sm hover:bg-ocean-blue/5",
                      selectedDate.month === option.value ? "bg-ocean-blue/10 text-ocean-blue font-medium" : "text-gray-700"
                    )}
                    onClick={() => updateDatePart('month', option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Day dropdown */}
        <div className="relative w-[25%]" ref={dropdownRefs.day}>
          <button
            type="button"
            onClick={() => toggleDropdown('day')}
            className={cn(
              "w-full h-10 px-3 rounded-lg text-left",
              "transition-all duration-200 outline-none border text-sm",
              error ? "border-red-500 bg-red-50" : "border-gray-200 bg-white",
              openDropdown === 'day' ? "border-ocean-blue ring-2 ring-ocean-blue/20" : ""
            )}
          >
            {selectedDate.day || 'Day'}
            <ChevronDown 
              size={16} 
              className={cn(
                "absolute right-3 top-3 transition-transform duration-200",
                openDropdown === 'day' ? "transform rotate-180" : ""
              )} 
            />
          </button>
          
          <AnimatePresence>
            {openDropdown === 'day' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 overflow-auto"
              >
                <div className="gap-1 p-2">
                  {days.map(option => (
                    <div
                      key={option.value}
                      className={cn(
                        "px-3 py-1  cursor-pointer text-sm rounded hover:bg-ocean-blue/5",
                        selectedDate.day === option.value ? "bg-ocean-blue/10 text-ocean-blue font-medium" : "text-gray-700"
                      )}
                      onClick={() => updateDatePart('day', option.value)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Year dropdown */}
        <div className="relative w-[25%]" ref={dropdownRefs.year}>
          <button
            type="button"
            onClick={() => toggleDropdown('year')}
            className={cn(
              "w-full h-10 px-3 rounded-lg text-left",
              "transition-all duration-200 outline-none border text-sm",
              error ? "border-red-500 bg-red-50" : "border-gray-200 bg-white",
              openDropdown === 'year' ? "border-ocean-blue ring-2 ring-ocean-blue/20" : ""
            )}
          >
            {selectedDate.year || 'Year'}
            <ChevronDown 
              size={16} 
              className={cn(
                "absolute right-3 top-3 transition-transform duration-200",
                openDropdown === 'year' ? "transform rotate-180" : ""
              )} 
            />
          </button>
          
          <AnimatePresence>
            {openDropdown === 'year' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 overflow-auto"
              >
                {years.map(option => (
                  <div
                    key={option.value}
                    className={cn(
                      "px-3 py-2 cursor-pointer text-sm hover:bg-ocean-blue/5",
                      selectedDate.year === option.value ? "bg-ocean-blue/10 text-ocean-blue font-medium" : "text-gray-700"
                    )}
                    onClick={() => updateDatePart('year', option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {!isValidDate(selectedDate.day, selectedDate.month, selectedDate.year) && 
       selectedDate.day && selectedDate.month && selectedDate.year && (
        <div className="flex items-center mt-1 text-sm text-red-500">
          <AlertCircle className="h-3 w-3 mr-1" />
          <p>Please enter a valid date</p>
        </div>
      )}
      
      {error && (
        <div className="flex items-center mt-1 text-sm text-red-500">
          <AlertCircle className="h-3 w-3 mr-1" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}