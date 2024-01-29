import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { formatDate, getCache, setCache } from "@/app/utils/utils";

export interface AssetData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currency: string;
  totalValue: number;
  purchaseDate: string;
  historicalPrice: number;
}

interface PortfolioState {
  assets: AssetData[];
}

interface FetchHistoricalPriceResult {
  name: string;
  historicalPrice: number;
}

interface FetchHistoricalPriceArgs {
  assetId: string;
  name: string;
  purchaseDate: string;
  currency: string;
}

function loadAssetsFromLocalStorage() {
  if (typeof window === "undefined") return [];
  const savedAssets = localStorage.getItem("assets");
  return savedAssets ? JSON.parse(savedAssets) : [];
}

const initialState: PortfolioState = {
  assets: loadAssetsFromLocalStorage(),
};

export const fetchHistoricalPrice = createAsyncThunk<
  FetchHistoricalPriceResult,
  FetchHistoricalPriceArgs
>(
  "portfolio/fetchPriceDifference",
  async ({ assetId, name, purchaseDate, currency }) => {
    try {
      const formattedDate = formatDate(purchaseDate);
      const cacheKey = `historicalPrice-${assetId}-${formattedDate}-${currency}`;
      const cachedPrice = getCache(cacheKey);

      if (cachedPrice !== null) return { name, historicalPrice: cachedPrice };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${assetId}/history?date=${formattedDate}`
      );
      const historicalData = await response.json();
      const historicalPrice =
        historicalData.market_data.current_price[currency];

      setCache(cacheKey, historicalPrice, 60);
      return { name, historicalPrice };
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
    builder.addCase(fetchHistoricalPrice.fulfilled, (state, action) => {
      console.log("Before update:", state);
      console.log("Action payload:", action.payload);

      const { name, historicalPrice } = action.payload;
      const assetIndex = state.assets.findIndex((asset) => asset.name === name);

      if (assetIndex !== -1) {
        state.assets[assetIndex].historicalPrice = historicalPrice;
      }

      console.log("After update:", state);
    });
  },
});

export const { addAsset, editAsset, deleteAsset, setAssets } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
