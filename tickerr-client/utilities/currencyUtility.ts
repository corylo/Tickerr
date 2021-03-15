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
      maximumSignificantDigits: 12
    });

    return formatter.format(value);
  }
}