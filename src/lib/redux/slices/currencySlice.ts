import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import { ALL_CURRENCIES } from "@/lib/constants/currencies";
import { toast } from "@/components/ui/Toast";
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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Get default currency
const getDefaultCurrency = (): Currency => {
  if (typeof window !== "undefined") {
    const savedCurrency = localStorage.getItem("preferred-currency");
    if (savedCurrency) {
      const found = ALL_CURRENCIES.find((c) => c.code === savedCurrency);
      if (found) return found;
    }
  }
  return ALL_CURRENCIES.find((c) => c.code === "USD") || ALL_CURRENCIES[0];
};

// Fetch exchange rates using Frankfurter API which supports PKR
export const fetchExchangeRates = createAsyncThunk(
  "currency/fetchExchangeRates",
  async (selectedCurrency: string) => {
    if (localStorage.getItem("exchange-rates")) {
      return JSON.parse(localStorage.getItem("exchange-rates"));
    }
    try {
      // Try Frankfurter API first (supports PKR)
      const response = await axios.get(
        `http://api.currencyapi.com/v3/latest?&base_currency=${selectedCurrency}&apikey=${process.env.NEXT_PUBLIC_CURRENCY_CONVERTER_API_KEY}`
      );

      if (response.data && response.data.data) {
        localStorage.setItem(
          "exchange-rates",
          JSON.stringify(response.data.data)
        );
        return response.data.data;
      }
      throw new Error("Invalid response from currencyapi.com");
    } catch (error) {
      toast.error("Error  " + error.message);
    }
  }
);

const initialState: CurrencyState = {
  selectedCurrency: getDefaultCurrency(),
  exchangeRates: {},
  lastFetched: null,
  status: "idle",
  error: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setSelectedCurrency: (state, action: PayloadAction<Currency>) => {
      state.selectedCurrency = action.payload;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred-currency", action.payload.code);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exchangeRates = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCurrency } = currencySlice.actions;

export default currencySlice.reducer;
