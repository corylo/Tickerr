interface ICurrencyUtility {
  getChangeClass: (value: number) => string;
  formatNumber: (value: number, min?: number, max?: number) => string;
  formatUSD: (value: number) => string;
}

export const CurrencyUtility: ICurrencyUtility = {
  getChangeClass: (value: number): string => {
    if(value !== undefined) {
      return value >= 0 ? "green" : "red";
    }

    return null;
  },
  formatNumber: (value: number, min?: number, max?: number): string => {
    return Intl.NumberFormat(navigator.language, {
      minimumFractionDigits: min !== undefined ? min : 2,
      maximumFractionDigits: max !== undefined ? max : 2,
    }).format(value);
  },
  formatUSD: (value: number): string => {
    const formatter: Intl.NumberFormat = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value % 1 !== 0 || value < 10 ? 2 : 0,
      maximumFractionDigits: 4
    });

    return formatter.format(value);
  }
}