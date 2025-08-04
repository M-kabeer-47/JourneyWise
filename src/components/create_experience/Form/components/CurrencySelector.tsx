import { useState, useEffect } from "react";
import axios from "axios";

interface CurrencySelectorProps {
  register: any;
  focusedField: string | null;
  onFocus: (field: string) => void;
  onBlur: () => void;
  setValue: any;
  error: any;
}

export default function CurrencySelector({
  register,
  focusedField,
  onFocus,
  onBlur,
  setValue,
  error,
}: CurrencySelectorProps) {
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://openexchangerates.org/api/currencies.json"
        );
        setCurrencies(Object.keys(response.data));
      } catch (error) {
        console.error("Error fetching currencies:", error);
        setCurrencies(["USD", "EUR", "GBP", "JPY"]); // Fallback currencies
      }
    };
    fetchCurrencies();
  }, []);

  return (
    <div className="space-y-2 mb-6">
      <label className="block text-base font-medium text-midnight-blue">
        Currency
      </label>
      <div className="relative">
        <input
          type="text"
          {...register("currency")}
          onFocus={() => onFocus("currency")}
          onBlur={() => {
            onBlur();
            // Fallback to USD if currency not found
            setValue("currency", (value: string) => {
              if (!currencies.includes(value)) return "USD";
              return value;
            });
          }}
          list="currency-list"
          className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                  transition-all duration-200 outline-none
                  ${
                    focusedField === "currency"
                      ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                      : "border-gray-200"
                  }`}
          placeholder="Select currency"
        />
        <datalist id="currency-list">
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </datalist>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}