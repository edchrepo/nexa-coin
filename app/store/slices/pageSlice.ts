import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
