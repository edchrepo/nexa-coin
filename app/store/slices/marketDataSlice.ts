import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface MarketData {
    active_cryptocurrencies: number;
    ended_icos: number
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
    updated_at: 0
}

export const fetchMarketData = createAsyncThunk(
    'marketData/fetchMarketData',
    async () => {
      const response = await fetch("https://api.coingecko.com/api/v3/global");
      const data = await response.json();
      return data.data;
    }
  );

  export const marketDataSlice = createSlice({
    name: 'marketData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMarketData.fulfilled, (state, action) => {
          return action.payload;
        });
    },
  });

export default marketDataSlice.reducer