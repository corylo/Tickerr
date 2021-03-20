import { Currency } from "../../../enums/currency";
import { Font } from "../../../enums/font";

export interface IAppSettings {
  currency: Currency;
  font: Font;
}

export const defaultAppSettings = (): IAppSettings => ({
  currency: Currency.USD,
  font: Font.Bold
});