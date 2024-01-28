interface CacheEntry {
  timestamp: number;
  data: any;
  expiration: number;
}

interface Cache {
  [id: string]: CacheEntry;
}

export function setCache(
  key: string,
  data: any,
  expirationMinutes: number = 15,
  id: string = "singleItem"
) {
  const cacheString = localStorage.getItem(key);
  let cache: Cache = {};

  if (cacheString) {
    cache = JSON.parse(cacheString);
  }

  // Update the id for each entry in multi-item cache keys
  // e.g. if key = coinSummaryCache ---> coinSummaryCache[bitcoin], coinSummaryCache[ethereum]

  // If the cache key contains a single item (chartData, coinData), the id is just singleItem
  // e.g. if key = coinDataCache || chartDataCache ---> coinDataCache[singleItem], chartDataCache[singleItem]
  cache[id] = {
    timestamp: Date.now(),
    data: data,
    expiration: expirationMinutes,
  };

  localStorage.setItem(key, JSON.stringify(cache));
}

export function getCache(key: string, id: string = "singleItem") {
  const cacheEntryString = localStorage.getItem(key);

  if (!cacheEntryString) return null;

  const cache: Cache = JSON.parse(cacheEntryString);
  const entry = cache[id];
  if (!entry) return null;

  const { timestamp, data, expiration } = entry;
  const ageMinutes = (Date.now() - timestamp) / (1000 * 60);

  if (ageMinutes < expiration) {
    return data;
  }

  // Optionally, clean up the specific entry if expired
  // For single items, this removes the entire cache since cache[id] is cache[singleItem]
  delete cache[id];
  localStorage.setItem(key, JSON.stringify(cache));

  return null;
}

export function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDate(isoDateStr: string): string {
  return `${isoDateStr.substring(8, 10)}-${isoDateStr.substring(
    5,
    7
  )}-${isoDateStr.substring(0, 4)}`;
}

export const currencyMap = {
  usd: "$",
  eur: "€",
  gbp: "£",
  jpy: "¥",
  krw: "₩",
};

export function formatCurrency(
  value: number,
  currency: keyof typeof currencyMap = "usd"
): string {
  let formattedValue: string;
  // conversion to M, B, T
  if (value >= 1e12) {
    formattedValue = `${currencyMap[currency]}${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    formattedValue = `${currencyMap[currency]}${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    formattedValue = `${currencyMap[currency]}${(value / 1e6).toFixed(2)}M`;
  } else {
    formattedValue = `${currencyMap[currency]}${value && value.toFixed(0)}`;
  }

  return formattedValue;
}

export function formatCurrencyCommas(
  value: number,
  currency: keyof typeof currencyMap = "usd"
): string {
  // Format number with commas
  const formattedNumber = new Intl.NumberFormat().format(value);

  // Append currency symbol
  const formattedValue = `${currencyMap[currency]}${formattedNumber}`;

  return formattedValue;
}

export const calculateProfitPercentage = (
  currentPrice: number,
  historicalPrice: number
): number => {
  if (historicalPrice === 0) return 0;
  const profitPercentage =
    ((currentPrice - historicalPrice) / historicalPrice) * 100;
  return parseFloat(profitPercentage.toFixed(2));
};
