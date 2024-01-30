import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCache, setCache } from "@/app/utils/utils";

export interface ChartData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

interface ChartDataArgs {
  timeFrame: number;
  currency: string;
  selectedCoins: string[];
}

const initialState: ChartData[] = [];

export const fetchChartData = createAsyncThunk(
  "chartData/fetchChartData",
  async (args: ChartDataArgs) => {
    const { timeFrame, currency, selectedCoins } = args;

    // Default to 'bitcoin' if selectedCoins is empty
    const coinsToFetch =
      selectedCoins.length === 0 ? ["bitcoin"] : selectedCoins;

    if (!process.env.NEXT_PUBLIC_API_CHART_URL) {
      throw new Error("Missing API call");
    }

    try {
      // grab data for all selectedCoins
      const fetchPromises = coinsToFetch.map((coinId) =>
        fetch(
          `${process.env.NEXT_PUBLIC_API_CHART_URL}${coinId}/market_chart?vs_currency=${currency}&days=${timeFrame}&interval=daily&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        ).then((response) => {
          if (!response.ok) {
            throw new Error("Network error");
          }
          return response.json();
        })
      );

      const results = await Promise.all(fetchPromises);
      return results;
    } catch (error) {
      console.log(error);
      throw new Error("API error");
    }
  }
);

export const chartDataSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChartData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default chartDataSlice.reducer;
