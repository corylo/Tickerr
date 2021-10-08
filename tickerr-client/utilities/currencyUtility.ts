import { Currency } from "../../tickerr-enums/currency";

interface ICurrencyUtility {
  getChangeClass: (value: number) => string;
  formatNumber: (value: number, min?: number, max?: number) => string;
  formatCurrency: (value: number, currency: Currency) => string;
  getMaximumFractionDigits: (min: number) => number;
  getMinimumFractionDigits: (value: number) => number;
}

export const CurrencyUtility: ICurrencyUtility = {
  getChangeClass: (value: number): string => {
    return value >= 0 ? "green" : "red";
  },
  formatNumber: (value: number, min?: number, max?: number): string => {
    return Intl.NumberFormat(navigator.language, {
      minimumFractionDigits: min !== undefined ? min : 2,
      maximumFractionDigits: max !== undefined ? max : 2,
    }).format(value);
  },
  formatCurrency: (value: number, currency: Currency): string => {
    if(value >= 0.01) {
      const minimumFractionDigits: number = CurrencyUtility.getMinimumFractionDigits(value),
        maximumFractionDigits: number = CurrencyUtility.getMaximumFractionDigits(minimumFractionDigits);
        
      const formatter: Intl.NumberFormat = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
        minimumFractionDigits,
        maximumFractionDigits
      });

      return formatter.format(value);
    }

    const split: string[] = value.toString().split(".");

    if(split.length > 1) {
      const decimals: number = split[1].length;

      const formatter: Intl.NumberFormat = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });

      return formatter.format(value);
    }

    return value.toString();
  },
  getMaximumFractionDigits: (min: number): number => {
    return min > 4 ? min : 4;
  },
  getMinimumFractionDigits: (value: number): number => {
    if(value % 1 !== 0 || value < 10000) {
      return 2;
    }

    return 0;
  }
}