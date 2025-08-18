import { useState } from "react";
import { Check, ChevronDown, DollarSign, Search } from "lucide-react";
import { currencies } from "@/lib/constants/currencies";
import { cn } from "@/utils/blog/utils";
interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
const CurrencySelect = ({ value, onChange, error }: CurrencySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCurrency =
    currencies.find((c) => c.code === value) || currencies[0];

  const handleSelect = (currencyCode: string) => {
    onChange(currencyCode);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="space-y-2 relative">
      <label
        className={cn(
          "block text-xs sm:text-sm font-medium text-charcoal",
          error && "text-red-500"
        )}
      >
        Currency
      </label>

      <div className="relative">
        <DollarSign className="absolute left-3 top-[14px] sm:top-[12px] sm:w-5 sm:h-5 w-4 h-4 text-gray-400" />

        <button
          type="button"
          className={cn(
            "pl-10 w-full h-11 rounded-lg text-left text-charcoal text-sm",
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
          <span className="text-xs sm:text-sm">
            {selectedCurrency.code} - {selectedCurrency.name} (
            {selectedCurrency.symbol})
          </span>
          <ChevronDown className="h-4 w-4 relative right-[8px] text-gray-400" />
        </button>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-y-auto border border-gray-200">
          <div className="p-2 sticky top-0 bg-white border-b">
            <div className="relative">
              <input
                type="text"
                className="w-full h-9 pl-8 pr-3 rounded-md border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <ul className="py-2">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <li
                  key={currency.code}
                  className="px-3 py-2 cursor-pointer text-sm hover:bg-ocean-blue/5 flex items-center justify-between"
                  onClick={() => handleSelect(currency.code)}
                >
                  <span>
                    {currency.code} - {currency.name} ({currency.symbol})
                  </span>
                  {value === currency.code && (
                    <Check className="h-4 w-4 text-ocean-blue" />
                  )}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500 italic">
                No currencies found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySelect;