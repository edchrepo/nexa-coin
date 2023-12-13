import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

// Async thunk for fetching chart data
export const fetchChartData = createAsyncThunk(
    'chartData/fetchChartData',
    async (timeFrame: number) => {
        if (!process.env.NEXT_PUBLIC_API_CHART_URL) {
            throw new Error('API URL is not defined');
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_CHART_URL}${timeFrame}&interval=daily`);
        const data = await response.json();
        return data;
    }
);

export const chartDataSlice = createSlice({
    name: 'chartData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchChartData.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default chartDataSlice.reducer;