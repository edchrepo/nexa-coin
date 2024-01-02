// Convert currency amount (e.g. BTC) to a target currency amount (e.g. ETH)
export function convert(
    amountToConvert: number,
    convertFrom: number,
    convertTo: number
  ): number {
    // Convert the amount to the base currency (e.g., USD)
    const amountInBaseCurrency = amountToConvert * convertFrom;
  
    // Convert back to amount of target currency
    const convertedAmount = amountInBaseCurrency / convertTo;
  
    return convertedAmount;
  }