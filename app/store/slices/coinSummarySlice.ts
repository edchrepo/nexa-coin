import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCache, setCache } from "@/app/utils/utils";

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

const initialState: CoinSummary = {
  id: "",
  symbol: "",
  name: "",
  description: { en: "" },
  image: { large: "" },
  links: { homepage: [], blockchain_site: []},
  market_data: {
    current_price: {},
    price_change_percentage_24h: 0,
    ath: {},
    ath_date: {},
    atl: {},
    atl_date: {},
    market_cap: {},
    fully_diluted_valuation: {},
    market_cap_change_24h: 0,
    mcap_to_tvl_ratio: 0,
    total_volume: {},
    circulating_supply: 0,
    max_supply: 0,
  },
};

export const fetchCoinSummary = createAsyncThunk(
  "coinSummary/fetchCoinSummary",
  async (coinId: string) => {
    // Check if cached data is available and valid
    const cachedData = getCache("coinSummaryCache");
    if (cachedData) {
      return cachedData;
    }

    if (!process.env.NEXT_PUBLIC_API_CHART_URL) {
      throw new Error("API URL is not defined");
    }

    const url = `${process.env.NEXT_PUBLIC_API_CHART_URL}${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // Cache the new data with a specific expiration time (in minutes)
    setCache("coinSummaryCache", data.data, 15);

    return data;
  }
);

export const coinSummarySlice = createSlice({
  name: "coinSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoinSummary.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default coinSummarySlice.reducer;
