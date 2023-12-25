import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCache, setCache } from "@/app/utils/utils";

interface MarketData {
  active_cryptocurrencies: number;
  ended_icos: number;
  market_cap_change_percentage_24h_usd: number;
  market_cap_percentage: { [key: string]: number };
  markets: number;
  ongoing_icos: number;
  total_market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  upcoming_icos: number;
  updated_at: number;
}

const initialState: MarketData = {
  active_cryptocurrencies: 0,
  ended_icos: 0,
  market_cap_change_percentage_24h_usd: 0,
  market_cap_percentage: {},
  markets: 0,
  ongoing_icos: 0,
  total_market_cap: {},
  total_volume: {},
  upcoming_icos: 0,
  updated_at: 0,
};

export const fetchMarketData = createAsyncThunk(
  "marketData/fetchMarketData",
  async () => {
    // Check if cached data is available and valid
    const cachedData = getCache("marketDataCache");
    if (cachedData) {
      return cachedData;
    }

    if (!process.env.NEXT_PUBLIC_API_MARKETDATA_URL) {
      throw new Error("API URL is not defined");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_MARKETDATA_URL);
    const data = await response.json();

    // Cache the new data with a specific expiration time (in minutes)
    setCache("marketDataCache", data.data, 15);

    return data.data;
  }
);

export const marketDataSlice = createSlice({
  name: "marketData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMarketData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default marketDataSlice.reducer;
