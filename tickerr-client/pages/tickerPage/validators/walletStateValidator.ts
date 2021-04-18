import { IWalletState } from "../models/walletState";
import { IWalletStateErrors } from "../models/walletStateErrors";

import { FormError } from "../../../enums/formError";
import { WalletStateAction } from "../enums/walletStateAction";

interface IWalletStateValidator {
  validateWallet: (walletState: IWalletState, dispatch: (type: WalletStateAction, payload?: any) => void) => boolean;
}

export const WalletStateValidator: IWalletStateValidator = {
  validateWallet: (walletState: IWalletState, dispatch: (type: WalletStateAction, payload?: any) => void): boolean => {
    const errors: IWalletStateErrors = { ...walletState.errors };

    let errorCount: number = 0;

    if(walletState.wallet.address.trim() === "") {
      errors.address = FormError.MissingValue;
      errorCount++;
    }

    dispatch(WalletStateAction.SetErrors, errors);

    return errorCount === 0;
  }
}