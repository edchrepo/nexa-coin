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

// Async thunk for fetching chart data
export const fetchCoinsData = createAsyncThunk(
  "coinsData/fetchCoinsData",
  async () => {
    if (!process.env.NEXT_PUBLIC_API_COINS_URL) {
      throw new Error('API URL is not defined');
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_COINS_URL);
    const data = await response.json();
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
