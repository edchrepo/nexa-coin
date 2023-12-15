import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCache, setCache } from "@/utils/utils";

interface ChartData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

interface ChartDataArgs {
  timeFrame: number;
  selectedCoins: string[];
}

const initialState: ChartData = {
  prices: [],
  market_caps: [],
  total_volumes: [],
};

// Async thunk for fetching chart data
export const fetchChartData = createAsyncThunk(
  "chartData/fetchChartData",
  async (args: ChartDataArgs) => {
    const { timeFrame, selectedCoins } = args;
    const coinToFetch =
      selectedCoins.length === 0 ? "bitcoin" : selectedCoins[0];
    // Check if cached data is available and valid
    // const cachedData = getCache("chartDataCache");
    // if (cachedData) {
    //   return cachedData;
    // }

    if (!process.env.NEXT_PUBLIC_API_CHART_URL) {
      throw new Error("API URL is not defined");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHART_URL}${coinToFetch}/market_chart?vs_currency=usd&days=${timeFrame}&interval=daily`
    );
    const data = await response.json();

    // Cache the new data with a specific expiration time (in minutes)
    // setCache("chartDataCache", data, 15);

    return data;
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
