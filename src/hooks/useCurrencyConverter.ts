import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./redux";
import { fetchExchangeRates } from "@/lib/redux/slices/currencySlice";
import { toast } from "@/components/ui/Toast";

export const useCurrencyConverter = ({ amount, fromCurrency }) => {
  const [convertedPrice, setConvertedPrice] = useState<string>(""); // State to hold converted price
  const dispatch = useAppDispatch();
  const { selectedCurrency, exchangeRates, lastFetched, status } =
    useAppSelector((state) => state.currency);

  useEffect(() => {
    setConvertedPrice(formatPrice({ amount, fromCurrency: fromCurrency }));
  },[exchangeRates])

  // Convert function with better error handling
  const convertCurrency = ({ amount, fromCurrency }): number => {
    let toCurrency = selectedCurrency.code;
    if (!amount) return 0;
    if (fromCurrency === toCurrency) return amount;
    if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
      return amount; // No rates available yet
    }

    console.log("Converting", amount, fromCurrency, "to", toCurrency);
    console.log("Type of amount:", typeof amount);
    console.log("Type of fromCurrency:", typeof fromCurrency);
    console.log("Type of toCurrency:", typeof toCurrency);

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

      // Always divide by the exchange rate (API gives 1 selectedCurrency = X fromCurrency)
      const convertedAmount = amount / exchangeRates[fromCurrency].value;
      console.log(
        `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency} (rate: ${exchangeRates[fromCurrency].value})`
      );

      return convertedAmount;
    } catch (err) {
      toast.error("Error: " + err.message);
      return amount; // Return original amount on error
    }
  };

  // Format price using Intl.NumberFormat + currency symbol
  const formatPrice = ({
    amount,
    fromCurrency,
    options = {},
  }: {
    amount: number;
    fromCurrency: string;
    options?: Intl.NumberFormatOptions;
  }): string => {
    const convertedAmount = convertCurrency({
      amount,
      fromCurrency: fromCurrency,
    });

    try {
      // Get the currency symbol from our currency array
      const currencySymbol = selectedCurrency.symbol || "";

      // Set up default formatting options
      const defaultOptions: Intl.NumberFormatOptions = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        ...options,
      };

      // Use Intl.NumberFormat for proper number formatting (commas, etc.)
      const formattedNumber = new Intl.NumberFormat(
        "en-US",
        defaultOptions
      ).format(convertedAmount);

      // Combine our currency symbol with the formatted number
      return `${currencySymbol}${formattedNumber}`;
    } catch (err) {
      // Fallback formatting
      console.warn("Currency formatting fallback:", err);
      const currencySymbol = selectedCurrency.symbol || "";
      const decimals = options.maximumFractionDigits || 0;

      // Manual formatting with toFixed
      return `${currencySymbol}${convertedAmount.toFixed(decimals)}`;
    }
  };

  return {
    currency: selectedCurrency,
    convertCurrency,
    formatPrice,
    isLoading: status === "loading",
    error: status === "failed",
    convertedPrice,
  };
};
