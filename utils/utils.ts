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
