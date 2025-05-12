import { useState, useEffect } from 'react';
import { Check, ChevronDown, Globe, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/shadcn/utils';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  error?: string;
}

export default function CountrySelect({ value, onChange, onCountryChange, error }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [countries, setCountries] = useState<{ name: string; code: string }[]>([]);

  useEffect(() => {
    // Fetch countries or use a static list
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then(response => response.json())
      .then(data => {
        const formattedData = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCountries(formattedData);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (countryName: string, countryCode: string) => {
    onChange(countryName);
    onCountryChange(countryCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="space-y-2 relative">
      <Label 
        htmlFor="country" 
        className={cn(
          "text-sm font-medium text-gray-700",
          error && "text-red-500"
        )}
      >
        Country<span className="text-red-500">*</span>
      </Label>
      
      <div className="relative">
        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        
        <button
          type="button"
          id="country"
          className={cn(
            "pl-10 w-full h-10 rounded-lg text-left text-charcoal text-sm",
            "transition-all duration-200 outline-none border",
            "flex items-center justify-between",
            error 
              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
              : "border-gray-200 bg-white focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20",
            isFocused ? "border-ocean-blue ring-2 ring-ocean-blue/20" : ""
          )}
          onClick={() => setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {value || "Select your country"}
          <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
        </button>
      </div>
      
      {error && (
        <div className="flex items-center mt-1 text-sm text-red-500">
          <AlertCircle className="h-3 w-3 mr-1" />
          <p>{error}</p>
        </div>
      )}
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 sticky top-0 bg-white border-b">
            <div className="relative">
              <input
                type="text"
                className="w-full h-9 pl-8 pr-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:border-ocean-blue focus:ring-1 focus:ring-ocean-blue"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <ul className="py-2">
            {filteredCountries.length > 0 ? (
              filteredCountries.map(country => (
                <li
                  key={country.code}
                  className="px-3 py-2 cursor-pointer text-sm hover:bg-ocean-blue/5 flex items-center justify-between"
                  onClick={() => handleSelect(country.name, country.code)}
                >
                  <span>{country.name}</span>
                  {value === country.name && <Check className="h-4 w-4 text-ocean-blue" />}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500 italic">No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

