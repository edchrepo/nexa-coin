import { createSlice } from "@reduxjs/toolkit";

interface Time {
  timeFrame: number;
}

const initialState: Time = {
  timeFrame: 30, // Default time frame
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setTimeFrame: (state, action) => {
      state.timeFrame = action.payload;
    },
  },
});

export const { setTimeFrame } = timeSlice.actions;
export default timeSlice.reducer;
