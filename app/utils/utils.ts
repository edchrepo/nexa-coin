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

  // If a cacheString is present, we update the id for each entry in the existing cache
  // e.g. coinSummaryCache[bitcoin], coinSummaryCache[ethereum]

  // If it isn't present the cache will just be a single item
  // e.g. coinData[singleItem], chartData[singleItem]
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
  console.log("Getting Cache From " + key)
  const entry = cache[id];
  if (!entry) return null;
  
  const { timestamp, data, expiration } = entry;
  const ageMinutes = (Date.now() - timestamp) / (1000 * 60);
  
  if (ageMinutes < expiration) {
    return data;
  }
  
  // Optionally, clean up the specific entry if expired
  // For single items, this removes the entire cache single cache[id] is cache[singleItem]
  delete cache[id];
  localStorage.setItem(key, JSON.stringify(cache));

  return null;
}

export function formatCurrency(value: number): string {
  let formattedValue: string;

  // conversion to M, B, T
  if (value >= 1e12) {
    formattedValue = `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    formattedValue = `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    formattedValue = `$${(value / 1e6).toFixed(2)}M`;
  } else {
    formattedValue = `$${value && value.toFixed(0)}`;
  }

  return formattedValue;
}
