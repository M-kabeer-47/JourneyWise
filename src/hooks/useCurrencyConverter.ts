import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./redux";
import { fetchExchangeRates } from "@/lib/redux/slices/currencySlice";
import { toast } from "@/components/ui/Toast";
export const useCurrencyConverter = () => {
  const dispatch = useAppDispatch();
  const { selectedCurrency, exchangeRates, lastFetched, status } =
    useAppSelector((state) => state.currency);

  // Convert function with better error handling
  const convertCurrency = ({ amount, toCurrency }): number => {
    let fromCurrency = selectedCurrency.code;
    if (!amount) return 0;
    if (fromCurrency === toCurrency) return amount;
    if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
      return amount; // No rates available yet
    }

    
    console.log("Converting", amount, fromCurrency, "to", toCurrency);
    // log type of every variable
    console.log("Type of amount:", typeof amount);
    console.log("Type of fromCurrency:", typeof fromCurrency);
    console.log("Type of toCurrency:", typeof toCurrency);
    try {
      // If rates aren't loaded yet
      if (Object.keys(exchangeRates).length === 0) {
        return amount; // Return original amount until rates are available
      }
      if (!exchangeRates[toCurrency]) {
        throw new Error("Unsupported currency for conversion");
      }

      // First convert to USD as base
      if(exchangeRates[toCurrency].value > 1){
        return (amount / exchangeRates[toCurrency].value)
      }
      return amount * exchangeRates[toCurrency].value;
    } catch (err) {
      toast.error("Error: " + err.message);
      return amount; // Return original amount on error
    }
  };

  // Format price with currency symbol
  const formatPrice = (
    amount: number,
    fromCurrency: string,
    options: Intl.NumberFormatOptions = {}
  ): string => {
    const convertedAmount = convertCurrency(amount, fromCurrency);

    try {
      const defaultOptions: Intl.NumberFormatOptions = {
        style: "currency",
        currency: selectedCurrency.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        ...options,
      };

      return new Intl.NumberFormat("en-US", defaultOptions).format(
        convertedAmount
      );
    } catch (err) {
      // If Intl.NumberFormat doesn't support this currency, use a simple format
      console.warn("Currency formatting fallback:", err);
      const symbol = selectedCurrency.symbol || "";
      return `${symbol}${convertedAmount.toFixed(
        options.maximumFractionDigits || 0
      )}`;
    }
  };

  return {
    currency: selectedCurrency,
    convertCurrency,
    formatPrice,
    isLoading: status === "loading",
    error: status === "failed",
  };
};
