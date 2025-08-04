import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CategoryDropdownProps {
  value: string;
  onChange: (value: string) => void; // Simplified to just accept string
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  options: string[];
  label?: string;
  name?: string; // For form field identification
}

export default function CategoryDropdown({
  value,
  onChange,
  onBlur,
  error,
  placeholder = "Select category",
  className = "",
  disabled = false,
  options,
  label,
  name,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocused(false);
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  const handleSelect = (option: string) => {
    onChange(option); // This will now call field.onChange from Controller
    setIsOpen(false);
    setFocused(false);
    onBlur?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setFocused(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-base font-medium text-midnight-blue">
          {label}
        </label>
      )}

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                     transition-all duration-200 outline-none flex items-center justify-between
                     ${
                       focused && isOpen
                         ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                         : "border-gray-200 hover:border-gray-300"
                     }
                     ${
                       disabled
                         ? "bg-gray-50 cursor-not-allowed"
                         : "bg-white cursor-pointer"
                     }
                     ${className}`}
        >
          <span className={value ? "text-charcoal" : "text-gray-400"}>
            {value || placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 
                       ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-sm">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors duration-150
                             hover:bg-gray-100 focus:bg-gray-50 focus:outline-none
                             ${
                               value === option
                                 ? "bg-ocean-blue/10 text-ocean-blue font-medium"
                                 : "text-charcoal"
                             }`}
                >
                  {option}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
