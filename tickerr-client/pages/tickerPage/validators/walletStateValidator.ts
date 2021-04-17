import { UserUtility } from "../../../utilities/userUtility";

import { IWallet } from "../../../../tickerr-models/wallet";
import { IWalletState } from "../models/walletState";
import { IWalletStateErrors } from "../models/walletStateErrors";

import { FormError } from "../../../enums/formError";
import { WalletStateAction } from "../enums/walletStateAction";

interface IWalletStateValidator {
  validateWallet: (wallets: IWallet[], walletState: IWalletState, dispatch: (type: WalletStateAction, payload?: any) => void) => boolean;
}

export const WalletStateValidator: IWalletStateValidator = {
  validateWallet: (wallets: IWallet[], walletState: IWalletState, dispatch: (type: WalletStateAction, payload?: any) => void): boolean => {
    const originalWallet: IWallet | null = UserUtility.getWallet(walletState.wallet.symbol, wallets);

    if(originalWallet && originalWallet.address === walletState.wallet.address) {
      return false;
    }

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