import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ALL_CURRENCIES } from '@/lib/constants/currencies';

export type Currency = {
  code: string;
  symbol: string;
  name: string;
  countryCode: string;
};

interface CurrencyState {
  selectedCurrency: Currency;
  exchangeRates: Record<string, number>;
  lastFetched: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Get default currency
const getDefaultCurrency = (): Currency => {
  if (typeof window !== 'undefined') {
    const savedCurrency = localStorage.getItem('preferred-currency');
    if (savedCurrency) {
      const found = ALL_CURRENCIES.find(c => c.code === savedCurrency);
      if (found) return found;
    }
  }
  return ALL_CURRENCIES.find(c => c.code === 'USD') || ALL_CURRENCIES[0];
};

// Fetch exchange rates using Frankfurter API which supports PKR
export const fetchExchangeRates = createAsyncThunk(
  'currency/fetchExchangeRates',
  async (baseCurrency: string = 'USD', { rejectWithValue }) => {
    try {
      // Try Frankfurter API first (supports PKR)
      const response = await axios.get(
        `https://api.frankfurter.app/latest?from=${baseCurrency}`
      );
      
      if (response.data && response.data.rates) {
        return response.data.rates;
      }
      
      // If Frankfurter fails, try backup API
      throw new Error("Primary API failed");
    } catch (primaryError) {
      try {
        // Backup: Try Exchange Rate API
        const backupResponse = await axios.get(
          `https://api.exchangerate.host/latest?base=${baseCurrency}`
        );
        
        if (backupResponse.data && backupResponse.data.rates) {
          return backupResponse.data.rates;
        }
        
        return rejectWithValue('Failed to fetch exchange rates from all sources');
      } catch (backupError) {
        console.error('Exchange rate API errors:', primaryError, backupError);
        return rejectWithValue('Failed to fetch exchange rates');
      }
    }
  }
);

const initialState: CurrencyState = {
  selectedCurrency: getDefaultCurrency(),
  exchangeRates: {},
  lastFetched: null,
  status: 'idle',
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setSelectedCurrency: (state, action: PayloadAction<Currency>) => {
      state.selectedCurrency = action.payload;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-currency', action.payload.code);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exchangeRates = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCurrency } = currencySlice.actions;

export default currencySlice.reducer;