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
  isHydrated: boolean; // Add this to track hydration state
}

// Get default currency - always return USD for SSR consistency
const getDefaultCurrency = (): Currency => {
  return ALL_CURRENCIES.find((c) => c.code === "USD") || ALL_CURRENCIES[0];
};

// New action to load currency from localStorage after hydration
export const loadSavedCurrency = createAsyncThunk(
  "currency/loadSavedCurrency",
  async () => {
    if (typeof window !== "undefined") {
      const savedCurrency = localStorage.getItem("preferred-currency");
      if (savedCurrency) {
        const found = ALL_CURRENCIES.find((c) => c.code === savedCurrency);
        if (found) return found;
      }
    }
    return null;
  }
);

// Fetch exchange rates using CurrencyAPI
export const fetchExchangeRates = createAsyncThunk(
  "currency/fetchExchangeRates",
  async (selectedCurrencyCode: string, { rejectWithValue }) => {
    let storedRates = null;
    
    // Only access localStorage on client side
    if (typeof window !== "undefined") {
      storedRates = localStorage.getItem("exchange-rates");
    }
    
    if (
      storedRates &&
      JSON.parse(storedRates)[selectedCurrencyCode] &&
      Date.now() - JSON.parse(storedRates)[selectedCurrencyCode].fetchedTime <
        24 * 60 * 60 * 1000
    ) {
      console.log("Using cached rates for", selectedCurrencyCode);
      return JSON.parse(storedRates)[selectedCurrencyCode].exchangeRates;
    }

    try {
      const response = await axios.get(
        `https://api.currencyapi.com/v3/latest?&base_currency=${selectedCurrencyCode}&apikey=${process.env.NEXT_PUBLIC_CURRENCY_CONVERTER_API_KEY}`
      );

      if (response.data && response.data.data) {
        // Only update localStorage on client side
        if (typeof window !== "undefined") {
          let updatedStoredRates = storedRates
            ? {
                ...JSON.parse(storedRates),
                [selectedCurrencyCode]: {
                  exchangeRates: response.data.data,
                  fetchedTime: Date.now(),
                },
              }
            : {
                [selectedCurrencyCode]: {
                  exchangeRates: response.data.data,
                  fetchedTime: Date.now(),
                },
              };
          localStorage.setItem(
            "exchange-rates",
            JSON.stringify(updatedStoredRates)
          );
        }
        return response.data.data;
      }
      throw new Error("Invalid response from currencyapi.com");
    } catch (error: any) {
      const errorMessage = error.message || "Failed to fetch exchange rates";
      toast.error("Currency API Error: " + errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState: CurrencyState = {
  selectedCurrency: getDefaultCurrency(), // Always USD initially
  exchangeRates: {},
  lastFetched: null,
  status: "idle",
  error: null,
  isHydrated: false, // Track hydration state
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setSelectedCurrency: (state, action: PayloadAction<Currency>) => {
      state.selectedCurrency = action.payload;
      // Save to localStorage only on client side
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred-currency", action.payload.code);
      }
    },
    setHydrated: (state) => {
      state.isHydrated = true;
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
      })
      .addCase(loadSavedCurrency.fulfilled, (state, action) => {
        if (action.payload) {
          state.selectedCurrency = action.payload;
        }
        state.isHydrated = true;
      })
      .addCase(loadSavedCurrency.rejected, (state) => {
        state.isHydrated = true;
      });
  },
});

export const { setSelectedCurrency, setHydrated } = currencySlice.actions;

export default currencySlice.reducer;