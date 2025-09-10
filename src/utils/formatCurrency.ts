import { ALL_CURRENCIES } from '@/lib/constants/currencies';

// Custom formatter for currencies that might have issues with Intl.NumberFormat
export const formatCurrency = (amount: number, currencyCode: string, options?: Intl.NumberFormatOptions) => {
  // Special case for PKR
  if (currencyCode === 'PKR') {
    const decimals = (options?.maximumFractionDigits ?? 0) > 0 
      ? amount.toFixed(options?.maximumFractionDigits ?? 0) 
      : Math.floor(amount);
    return `₨${decimals.toLocaleString()}`;
  }
  
  // For other currencies, try Intl.NumberFormat
  try {
    const opts: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...options
    };
    
    return new Intl.NumberFormat('en-US', opts).format(amount);
  } catch (e) {
    // Fallback for any currency not supported by Intl
    const currencySymbol = ALL_CURRENCIES.find(c => c.code === currencyCode)?.symbol || currencyCode;
    return `${currencySymbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: options?.minimumFractionDigits || 0,
      maximumFractionDigits: options?.maximumFractionDigits || 0
    })}`;
  }
};