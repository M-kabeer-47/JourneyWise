import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux';
import { fetchExchangeRates } from '@/lib/redux/slices/currencySlice';

export const useCurrencyConverter = () => {
  const dispatch = useAppDispatch();
  const { selectedCurrency, exchangeRates, lastFetched, status } = useAppSelector(
    (state) => state.currency
  );

  useEffect(() => {
    const fetchRatesIfNeeded = () => {
      // Fetch rates if not available or older than 1 hour
      const now = Date.now();
      if (
        !lastFetched || 
        now - lastFetched > 3600000 || 
        Object.keys(exchangeRates).length === 0
      ) {
        dispatch(fetchExchangeRates('USD'));
      }
    };

    fetchRatesIfNeeded();
  }, [dispatch, lastFetched, exchangeRates]);

  // Convert function with better error handling
  const convertCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string = selectedCurrency.code
  ): number => {
    if (!amount) return 0;
    if (fromCurrency === toCurrency) return amount;
    
    try {
      // If rates aren't loaded yet
      if (Object.keys(exchangeRates).length === 0) {
        return amount; // Return original amount until rates are available
      }

      // First convert to USD as base
      let amountInUSD = amount;
      if (fromCurrency !== 'USD') {
        // Check if we have a direct rate from fromCurrency to USD
        if (exchangeRates['USD']) {
          // This means we're working with fromCurrency as base
          amountInUSD = amount * exchangeRates['USD'];
        } else {
          // We're working with USD as base, so we need the inverse rate
          const rateToUSD = 1 / (exchangeRates[fromCurrency] || 1);
          amountInUSD = amount * rateToUSD;
        }
      }

      // Then convert from USD to target currency
      if (toCurrency === 'USD') return amountInUSD;
      
      // Similar logic for target currency
      if (exchangeRates['USD']) {
        // fromCurrency is base
        return amountInUSD / exchangeRates['USD'] * (exchangeRates[toCurrency] || 1);
      } else {
        // USD is base
        const usdToTarget = exchangeRates[toCurrency] || 1;
        return amountInUSD * usdToTarget;
      }
    } catch (err) {
      console.error('Currency conversion error:', err);
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
        style: 'currency',
        currency: selectedCurrency.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        ...options
      };

      return new Intl.NumberFormat('en-US', defaultOptions).format(convertedAmount);
    } catch (err) {
      // If Intl.NumberFormat doesn't support this currency, use a simple format
      console.warn('Currency formatting fallback:', err);
      const symbol = selectedCurrency.symbol || '';
      return `${symbol}${convertedAmount.toFixed(options.maximumFractionDigits || 0)}`;
    }
  };

  return {
    currency: selectedCurrency,
    convertCurrency,
    formatPrice,
    isLoading: status === 'loading',
    error: status === 'failed'
  };
};