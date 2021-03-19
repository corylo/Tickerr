import { Currency } from "../../../enums/currency";

export interface IAppSettings {
  currency: Currency;
}

export const defaultAppSettings = (): IAppSettings => ({
  currency: Currency.USD
})