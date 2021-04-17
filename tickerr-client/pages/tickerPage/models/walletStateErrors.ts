import { FormError } from "../../../enums/formError";

export interface IWalletStateErrors {
  address: FormError;
}

export const defaultWalletStateErrors = (): IWalletStateErrors => ({
  address: FormError.None
});