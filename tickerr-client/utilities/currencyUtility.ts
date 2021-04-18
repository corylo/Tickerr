import { Currency } from "../../tickerr-enums/currency";

interface ICurrencyUtility {
  getChangeClass: (value: number) => string;
  formatNumber: (value: number, min?: number, max?: number) => string;
  formatCurrency: (value: number, currency: Currency, max?: number) => string;
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
  formatCurrency: (value: number, currency: Currency, max?: number): string => {
    const formatter: Intl.NumberFormat = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: value % 1 !== 0 || value < 10000 ? 2 : 0,
      maximumFractionDigits: max || 4
    });

    return formatter.format(value);
  }
}