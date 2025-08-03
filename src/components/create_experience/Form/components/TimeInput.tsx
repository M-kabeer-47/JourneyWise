import { ChevronDown, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TimeInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  focused,
  placeholder = "Time (optional)",
}: {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused: boolean;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [openDropdown, setOpenDropdown] = useState<'hours' | 'minutes' | 'period' | null>(null);
  const timeInputRef = useRef<HTMLDivElement>(null);

  // Parse existing value when component mounts or value changes
  useEffect(() => {
    if (value) {
      const timeMatch = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (timeMatch) {
        setHours(timeMatch[1].padStart(2, "0"));
        setMinutes(timeMatch[2]);
        setPeriod(timeMatch[3].toUpperCase());
      }
    }
  }, [value]);

  const handleTimeChange = (
    newHours: string,
    newMinutes: string,
    newPeriod: string
  ) => {
    const formattedTime = `${newHours}:${newMinutes} ${newPeriod}`;
    onChange(formattedTime);
  };

  const hourOptions = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minuteOptions = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  // Custom Select Component
  const CustomSelect = ({ 
    value, 
    options, 
    onChange, 
    label,
    dropdownKey 
  }: {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    label: string;
    dropdownKey: 'hours' | 'minutes' | 'period';
  }) => (
    <div>
      <label className="block text-xs font-medium text-charcoal mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(openDropdown === dropdownKey ? null : dropdownKey);
          }}
          className={`w-full px-3 py-2 text-sm border rounded-lg text-left flex items-center justify-between
                     transition-all duration-200 outline-none 
                     ${openDropdown === dropdownKey 
                       ? "border-ocean-blue ring-2 ring-ocean-blue/20" 
                       : "border-gray-200"
                     }
                     `}
        >
          <span className="text-charcoal">{value}</span>
          <ChevronDown 
            className={`w-3 h-3 text-gray-400 transition-transform ${
              openDropdown === dropdownKey ? "rotate-180" : ""
            }`} 
          />
        </button>
        
        {openDropdown === dropdownKey && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-32 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(option);
                  setOpenDropdown(null);
                }}
                className={`w-full px-3 py-2 text-sm text-left hover:bg-ocean-blue/10 transition-colors
                           ${value === option ? "bg-ocean-blue/10 text-ocean-blue font-medium" : "text-charcoal"}
                           first:rounded-t-lg last:rounded-b-lg`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeInputRef.current && !timeInputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenDropdown(null);
        onBlur();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onBlur]);

  return (
    <div className="relative" ref={timeInputRef}>
      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            onFocus();
            setOpenDropdown(null);
          }
        }}
        className={`w-full pl-10 pr-3 h-11 rounded-lg border text-charcoal text-sm
                   transition-all duration-200 outline-none text-left flex items-center justify-between
                   ${
                     focused && !openDropdown
                       ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                       : "border-gray-200"
                   }
                 `}
      >
        <span className={value ? "text-charcoal" : "text-gray-400"}>
          {value.toString()}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="grid grid-cols-3 gap-3">
              <CustomSelect
                value={hours}
                options={hourOptions}
                onChange={(newHours) => {
                  setHours(newHours);
                  handleTimeChange(newHours, minutes, period);
                }}
                label="Hour"
                dropdownKey="hours"
              />

              <CustomSelect
                value={minutes}
                options={minuteOptions}
                onChange={(newMinutes) => {
                  setMinutes(newMinutes);
                  handleTimeChange(hours, newMinutes, period);
                }}
                label="Min"
                dropdownKey="minutes"
              />

              <CustomSelect
                value={period}
                options={["AM", "PM"]}
                onChange={(newPeriod) => {
                  setPeriod(newPeriod);
                  handleTimeChange(hours, minutes, newPeriod);
                }}
                label="Period"
                dropdownKey="period"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setHours("12");
                  setMinutes("00");
                  setPeriod("AM");
                  setIsOpen(false);
                  setOpenDropdown(null);
                }}
                className="flex-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setOpenDropdown(null);
                }}
                className="flex-1 px-3 py-2 text-sm bg-ocean-blue text-white hover:bg-ocean-blue/90 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeInput;