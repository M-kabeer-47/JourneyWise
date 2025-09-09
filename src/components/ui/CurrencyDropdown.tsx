"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

const POPULAR_CURRENCIES = [
  { code: "USD", symbol: "$", name: "United States Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "Pound Sterling", flag: "🇬🇧" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", flag: "🇵🇰" },
];

const ALL_CURRENCIES = [
  { code: "USD", symbol: "$", name: "United States Dollar", flag: "🇺🇸" },
  { code: "AUD", symbol: "$", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CLP", symbol: "$", name: "Chilean Peso", flag: "🇨🇱" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna", flag: "🇨🇿" },
  { code: "DKK", symbol: "kr", name: "Danish Krone", flag: "🇩🇰" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "Pound Sterling", flag: "🇬🇧" },
  { code: "HKD", symbol: "$", name: "Hong Kong Dollar", flag: "🇭🇰" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint", flag: "🇭🇺" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", flag: "🇮🇩" },
  { code: "ILS", symbol: "₪", name: "Israeli New Shekel", flag: "🇮🇱" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", flag: "🇵🇰" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", flag: "🇸🇦" },
].filter(currency => currency.code !== "BTC"); // No crypto currencies

export default function CurrencyDropdown() {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    // Get from localStorage if available
    if (typeof window !== "undefined") {
      const savedCurrency = localStorage.getItem("preferred-currency");
      if (savedCurrency) {
        const found = ALL_CURRENCIES.find(c => c.code === savedCurrency);
        if (found) return found;
      }
    }
    return ALL_CURRENCIES[0];
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCurrencies = ALL_CURRENCIES.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCurrencySelect = (currency: (typeof ALL_CURRENCIES)[0]) => {
    setSelectedCurrency(currency);
    // Save to localStorage
    localStorage.setItem("preferred-currency", currency.code);
    setIsOpen(false);
    setSearchQuery("");
  };

  const closeModal = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-white hover:text-gray-200 transition-colors duration-200 font-medium text-sm"
      >
        {selectedCurrency.code}
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center ">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 left-[-20px] bg-black/75 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-midnight-blue font-raleway">
                    Select Currency
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-charcoal" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search currencies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-blue/20 focus:border-ocean-blue text-sm font-geist"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(80vh-140px)]">
                {!searchQuery && (
                  <>
                    {/* Popular Currencies */}
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-charcoal mb-4 font-geist uppercase tracking-wide">
                        Popular Currencies
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {POPULAR_CURRENCIES.map((currency) => (
                          <motion.button
                            key={`popular-${currency.code}`}
                            onClick={() => handleCurrencySelect(currency)}
                            className={`group flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                              selectedCurrency.code === currency.code
                                ? "border-ocean-blue bg-ocean-blue/5 shadow-md"
                                : "border-gray-200 hover:border-ocean-blue/50 hover:bg-ocean-blue/5 hover:shadow-md"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-ocean-blue/10 flex items-center justify-center text-2xl mb-2 transition-colors">
                              {currency.flag}
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <span className="font-bold text-charcoal text-sm group-hover:text-midnight-blue transition-colors">
                                  {currency.code}
                                </span>
                                <span className="text-ocean-blue font-semibold text-sm">
                                  {currency.symbol}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 group-hover:text-charcoal transition-colors font-geist line-clamp-2">
                                {currency.name}
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* All Currencies Header */}
                    <div className="px-6 py-4 bg-gray-50/50">
                      <h3 className="text-sm font-semibold text-charcoal font-geist uppercase tracking-wide">
                        All Currencies
                      </h3>
                    </div>
                  </>
                )}

                {/* Currency Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {filteredCurrencies.map((currency) => (
                      <motion.button
                        key={currency.code}
                        onClick={() => handleCurrencySelect(currency)}
                        className={`group flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          selectedCurrency.code === currency.code
                            ? "border-ocean-blue bg-ocean-blue/5 shadow-md"
                            : "border-gray-200 hover:border-ocean-blue/50 hover:bg-ocean-blue/5 hover:shadow-md"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-ocean-blue/10 flex items-center justify-center text-lg transition-colors flex-shrink-0">
                          {currency.flag}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-charcoal text-sm group-hover:text-midnight-blue transition-colors">
                              {currency.code}
                            </span>
                            <span className="text-ocean-blue font-semibold text-sm">
                              {currency.symbol}
                            </span>
                            {selectedCurrency.code === currency.code && (
                              <div className="w-2 h-2 bg-ocean-blue rounded-full ml-auto flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 group-hover:text-charcoal transition-colors font-geist truncate">
                            {currency.name}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {filteredCurrencies.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-geist text-sm">
                        No currencies found for "{searchQuery}"
                      </p>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-ocean-blue hover:text-midnight-blue transition-colors text-sm font-medium mt-2"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}