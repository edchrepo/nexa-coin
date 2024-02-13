import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCache, setCache } from "@/utils/utils";
import type { RootState } from "../store";

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  sparkline_in_7d: {
    price: number[];
  };
}

const initialState: CoinData[] = [];

// Async thunk for fetching chart data
export const fetchCoinsData = createAsyncThunk(
  "coinsData/fetchCoinsData",
  async (page: number, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const currency = state.currency.value;
    const cacheKey = `coinDataCache-${page}-${currency}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) return { data: cachedData, page };

    try {
      if (!process.env.NEXT_PUBLIC_API_COINS_URL) {
        throw new Error("API URL is not defined");
      }

      const url = `${process.env.NEXT_PUBLIC_API_COINS_URL}&vs_currency=${currency}&page=${page}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: Server responded with status ${response.status}`
        );
      }

      const data = await response.json();
      setCache(cacheKey, data, 15);
      return { data, page };
    } catch (error) {
      console.error("API Request Error:", error);
      return rejectWithValue("API Request Failed");
    }
  }
);

export const coinsDataSlice = createSlice({
  name: "coinsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoinsData.fulfilled, (state, action) => {
      const { data, page } = action.payload;
      if (page === 1) {
        return data;
      } else {
        // prevent DUPES from being added to coins
        const noDups = [...state];
        data.forEach((coin: CoinData) => {
          if (!noDups.find((c) => c.id === coin.id)) {
            // only append to coins with ids that don't already EXIST
            noDups.push(coin);
          }
        });
        return noDups;
      }
    });
  },
});

export default coinsDataSlice.reducer;
