import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { formatDate } from "@/app/utils/utils";

export interface AssetData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currency: string;
  totalValue: number;
  purchaseDate: string;
  currentPrice: number;
  profitPercentage: number;
  priceChange24h: number;
  marketToVolume: number;
  circToMax: number;
}

interface PortfolioState {
  assets: AssetData[];
}

interface FetchProfitPercentageArgs {
  assetId: string;
  purchaseDate: string;
  currentPrice: number;
}

function loadAssetsFromLocalStorage() {
  if (typeof window === "undefined") return [];
  const savedAssets = localStorage.getItem("assets");
  return savedAssets ? JSON.parse(savedAssets) : [];
}

const initialState: PortfolioState = {
  assets: loadAssetsFromLocalStorage(),
};

export const fetchProfitPercentage = createAsyncThunk<
  number,
  FetchProfitPercentageArgs
>(
  "portfolio/fetchPriceDifference",
  async ({ assetId, purchaseDate, currentPrice }) => {
    try {
      const formattedDate = formatDate(purchaseDate);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${assetId}/history?date=${formattedDate}`
      );
      const historicalData = await response.json();
      const historicalPrice = historicalData.market_data.current_price.usd;
      const profitPercentage =
        ((currentPrice - historicalPrice) / historicalPrice) * 100; // formula for calculating net income
      return parseFloat(profitPercentage.toFixed(2));
    } catch (error) {
      console.error("Error fetching historical data", error);
      throw error;
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchProfitPercentage.fulfilled, (state, action) => {
      const { assetId } = action.meta.arg;
      const assetIndex = state.assets.findIndex(
        (asset) => asset.id === assetId
      );

      if (assetIndex !== -1) {
        state.assets[assetIndex].profitPercentage = action.payload;
      }
    });
  },
});

export const { addAsset, editAsset, deleteAsset, setAssets } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
