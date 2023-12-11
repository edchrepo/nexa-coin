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
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
    );
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
