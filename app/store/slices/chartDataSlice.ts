import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCache, setCache } from "@/utils/utils";

interface ChartData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

const initialState: ChartData = {
  prices: [],
  market_caps: [],
  total_volumes: [],
};


export const fetchChartData = createAsyncThunk(
  "chartData/fetchChartData",
  async (timeFrame: number) => {
    try {
      // Check if cached data is available and valid
      // const cachedData = getCache("chartDataCache");
      // if (cachedData) {
      //   return cachedData;
      // }
      const response = await fetch(`/api/data?timeFrame=${timeFrame}`)

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(data)

      // Cache the new data with a specific expiration time (in minutes)
      // setCache("chartDataCache", data, 15);
      return data.data;

    } catch (error) {
      console.error(error);
      throw error;
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
