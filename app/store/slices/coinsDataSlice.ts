import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

function setCache(data: CoinData[]) {
  const cacheEntry = {
    timestamp: Date.now(),
    data: data,
  };
  localStorage.setItem("coinDataCache", JSON.stringify(cacheEntry));
}

function getCache() {
  const cacheEntry = localStorage.getItem("coinDataCache");
  if (!cacheEntry) return null;

  const { timestamp, data } = JSON.parse(cacheEntry);
  const ageMinutes = (Date.now() - timestamp) / (1000 * 60);

  if (ageMinutes < 15) {
    return data;
  }

  localStorage.removeItem("coinDataCache");
  return null;
}

// Async thunk for fetching chart data
export const fetchCoinsData = createAsyncThunk(
  "coinsData/fetchCoinsData",
  async () => {
    // Check if cached data is available and valid
    const cachedData = getCache();
    if (cachedData) {
      return cachedData;
    }

    if (!process.env.NEXT_PUBLIC_API_COINS_URL) {
      throw new Error("API URL is not defined");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_COINS_URL);
    const data = await response.json();

    // Cache the new data
    setCache(data);

    return data;
  }
);

export const coinsDataSlice = createSlice({
  name: "coinsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoinsData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default coinsDataSlice.reducer;
