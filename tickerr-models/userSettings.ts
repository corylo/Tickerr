import { Currency } from "../tickerr-enums/currency";
import { Font } from "../tickerr-enums/font";

export interface IUserSettings {
  currency: Currency;
  font: Font;
}

export const defaultUserSettings = (): IUserSettings => ({
  currency: Currency.USD,
  font: Font.Bold
});