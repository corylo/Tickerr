interface ICurrencyUtility {
  getChangeClass: (value: number) => string;
  formatUSD: (value: number) => string;
}

export const CurrencyUtility: ICurrencyUtility = {
  getChangeClass: (value: number): string => {
    return value >= 0 ? "green" : "red";
  },
  formatUSD: (value: number): string => {
    const formatter: Intl.NumberFormat = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value < 10 ? 2 : 0,
      maximumFractionDigits: 4
    });

    return formatter.format(value);
  }
}