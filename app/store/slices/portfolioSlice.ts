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
}

interface PortfolioState {
  assets: AssetData[];
}

interface FetchProfitPercentageArgs {
  assetId: string;
  purchaseDate: string;
  currency: string;
}

function loadAssetsFromLocalStorage() {
  if (typeof window === "undefined") return [];
  const savedAssets = localStorage.getItem("assets");
  return savedAssets ? JSON.parse(savedAssets) : [];
}

function getFallbackPrice(assetId: string, currency: string): number | null {
  const fallbackKey = `historicalPrice-${assetId}-${currency}`;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(fallbackKey)) {
      const cachedPrice = getCache(key);
      if (cachedPrice !== null) {
        return cachedPrice;
      }
    }
  }
  return null;
}

const initialState: PortfolioState = {
  assets: loadAssetsFromLocalStorage(),
};

export const fetchHistoricalPrice = createAsyncThunk<
  number,
  FetchProfitPercentageArgs
>(
  "portfolio/fetchPriceDifference",
  async ({ assetId, purchaseDate, currency }) => {
    try {
      const formattedDate = formatDate(purchaseDate);
      const cacheKey = `historicalPrice-${assetId}-${formattedDate}-${currency}`;
      const cachedPrice = getCache(cacheKey);

      if (cachedPrice !== null) return cachedPrice;

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${assetId}/history?date=${formattedDate}`
      );
      const historicalData = await response.json();
      const historicalPrice =
        historicalData.market_data.current_price[currency];

      setCache(cacheKey, historicalPrice, 60);
      return historicalPrice;
    } catch (error) {
      console.error("Error fetching historical data", error);
      const fallbackPrice = getFallbackPrice(assetId, currency);
      if (fallbackPrice !== null) return fallbackPrice;
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
});

export const { addAsset, editAsset, deleteAsset, setAssets } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
