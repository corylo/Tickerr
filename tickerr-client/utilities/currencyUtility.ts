interface ICurrencyUtility {
  formatUSD: (value: number) => string;
}

export const CurrencyUtility: ICurrencyUtility = {
  formatUSD: (value: number): string => {
    const formatter: Intl.NumberFormat = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });

    return formatter.format(value);
  }
}