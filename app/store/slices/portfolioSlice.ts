import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AssetData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  total_value: number;
  purchase_date: string;
  current_price: number;
  price_change_percentage_24h_in_currency: number;
  market_vs_volume: number;
  circ_vs_max: number;
}

interface PortfolioState {
  assets: AssetData[];
}

function loadAssetsFromLocalStorage() {
  if (typeof window === "undefined") return [];
  const savedAssets = localStorage.getItem("assets");
  return savedAssets ? JSON.parse(savedAssets) : [];
}

const initialState: PortfolioState = {
  assets: loadAssetsFromLocalStorage(),
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<AssetData>) => {
      state.assets.push(action.payload);
    },
    editAsset: (state, action: PayloadAction<AssetData>) => {
      const index = state.assets.findIndex(
        (asset) => asset.id === action.payload.id
      );
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
    },
    deleteAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload
      );
    },
    setAssets: (state, action: PayloadAction<AssetData[]>) => {
      state.assets = action.payload;
    },
  },
  // extraReducers for async thunks (API call for price difference)
});

export const { addAsset, editAsset, deleteAsset, setAssets } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
