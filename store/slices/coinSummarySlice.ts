import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCache, setCache } from "@/utils/utils";

export interface CoinSummary {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  image: { large: string };
  links: { homepage: string[], blockchain_site: string[]};
  market_data: {
    current_price: { [key: string] : number };
    price_change_percentage_24h: number;
    ath: { [key: string]: number };
    ath_date: { [key: string]: string};
    atl: { [key: string]: number };
    atl_date: { [key: string]: string};
    market_cap: { [key: string]: number };
    fully_diluted_valuation: { [key: string]: number };
    market_cap_change_24h: number;
    mcap_to_tvl_ratio: number;
    total_volume: { [key: string] : number};
    circulating_supply: number;
    max_supply: number;
  };
}

interface CoinSummariesState {
  [key: string]: CoinSummary; // using an object to map coin IDs to their summaries
}

const initialState: CoinSummariesState = {};

export const fetchCoinSummary = createAsyncThunk(
  "coinSummary/fetchCoinSummary",
  async (coinId: string) => {
    // Check if cached data is available and valid
    const cachedData = getCache("coinSummaryCache", coinId);
    if (cachedData) {
      console.log("Summary data retrieved from cache")
      return cachedData;
    }

    if (!process.env.NEXT_PUBLIC_API_CHART_URL) {
      throw new Error("API URL is not defined");
    }

    const url = `${process.env.NEXT_PUBLIC_API_CHART_URL}${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;
    const response = await fetch(url);
    const data = await response.json();

    // Cache the new data with a specific expiration time (in minutes)
    setCache("coinSummaryCache", data, 15, coinId);

    return data;
  }
);

export const coinSummarySlice = createSlice({
  name: "coinSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoinSummary.fulfilled, (state, action) => {
      const data: CoinSummary = action.payload;
      state[data.id] = data; // Store the summary under its coin ID
    });
  },
});

export default coinSummarySlice.reducer;
