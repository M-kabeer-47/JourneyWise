import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./redux";
import { fetchExchangeRates } from "@/lib/redux/slices/currencySlice";
import { toast } from "@/components/ui/Toast";
export const useCurrencyConverter = ({
  amount,
  fromCurrency,
}: {
  amount: number;
  fromCurrency: string;
}) => {
  const dispatch = useAppDispatch();
  const { selectedCurrency, exchangeRates, lastFetched, status } =
    useAppSelector((state) => state.currency);
  const [convertedPrice, setconvertedPrice] = useState<string | null>(null);

  useEffect(() => {
    setconvertedPrice(formatPrice({ amount, fromCurrency }));
  }, [exchangeRates]);
  // Convert function with better error handling

  const convertCurrency = ({ amount, fromCurrency }): number => {
    let toCurrency = selectedCurrency.code.toLowerCase();
    fromCurrency = fromCurrency.toLowerCase();
    if (!amount) return 0;
    if (fromCurrency === toCurrency) return amount;

    if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
      return amount; // No rates available yet
    }

    try {
      // If rates aren't loaded yet

      if (!exchangeRates[fromCurrency]) {
        throw new Error(
          "Unsupported currency for conversion: " +
            ", " +
            amount +
            ", " +
            fromCurrency
        );
      }

      // First convert to USD as base
      let exchangeRatePrice = exchangeRates[fromCurrency];
      console.log("To currency:", toCurrency);
      console.log("Exchange rate price:", exchangeRatePrice);
      if (exchangeRatePrice > 1) {
        return amount / exchangeRatePrice;
      }
      return amount * exchangeRatePrice;
    } catch (err) {
      toast.error("Error: " + err.message);
      return amount; // Return original amount on error
    }
  };

  // Format price with currency symbol
  const formatPrice = ({
    amount,
    fromCurrency,
    options,
  }: {
    amount: number;
    fromCurrency: string;
    options?: Intl.NumberFormatOptions;
  }): string => {
    const convertedPrice = convertCurrency({
      amount,
      fromCurrency: fromCurrency,
    });

    try {
      const defaultOptions: Intl.NumberFormatOptions = {
        style: "currency",
        currency: selectedCurrency.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        ...options,
      };

      return new Intl.NumberFormat("en-US", defaultOptions).format(
        convertedPrice
      );
    } catch (err) {
      // If Intl.NumberFormat doesn't support this currency, use a simple format
      console.warn("Currency formatting fallback:", err);
      const symbol = selectedCurrency.symbol || "";
      return `${symbol}${convertedPrice.toFixed(
        options.maximumFractionDigits || 0
      )}`;
    }
  };

  return {
    convertedPrice,
    currency: selectedCurrency,
    convertCurrency,
    formatPrice,
    isLoading: status === "loading",
    error: status === "failed",
  };
};
