import { createSlice } from "@reduxjs/toolkit";

type Currency = {
  currency: string;
}

const initialState: Currency = {
  currency: "usd", // Default currency
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
