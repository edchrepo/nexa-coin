export function setCache(
  key: string,
  data: any,
  expirationMinutes: number = 15
) {
  const cacheEntry = {
    timestamp: Date.now(),
    data: data,
    expiration: expirationMinutes,
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
}

export function getCache(key: string) {
  const cacheEntryString = localStorage.getItem(key);

  if (!cacheEntryString) return null;

  const { timestamp, data, expiration } = JSON.parse(cacheEntryString);
  const ageMinutes = (Date.now() - timestamp) / (1000 * 60);

  if (ageMinutes < expiration) {
    return data;
  }

  localStorage.removeItem(key);
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
