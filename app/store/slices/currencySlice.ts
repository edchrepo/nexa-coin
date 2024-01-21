import { createSlice } from "@reduxjs/toolkit";

type Currency = {
  value: string;
}

const initialState: Currency = {
  value: "usd", // Default currency
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
