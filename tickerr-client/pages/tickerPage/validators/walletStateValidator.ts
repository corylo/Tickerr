import { IWalletState } from "../models/walletState";

import { FormError } from "../../../enums/formError";
import { Symbol } from "../../../../tickerr-enums/symbol";
import { WalletStateAction } from "../enums/walletStateAction";

interface IWalletStateValidator {
  validateAddress: (symbol: string, address: string) => boolean;
  validateWallet: (walletState: IWalletState, dispatch: (type: WalletStateAction, payload?: any) => void) => boolean;
}

export const WalletStateValidator: IWalletStateValidator = {
  validateAddress: (symbol: string, address: string): boolean => {
    switch(symbol.toLowerCase()) {
      case Symbol.Ada:
        return symbol.indexOf("stake") === 0;
      default:
        console.error(`Symbol ${symbol} not found.`);
    }

    return false;
  },
  validateWallet: (walletState: IWalletState, dispatch: (type: WalletStateAction, payload?: any) => void): boolean => {
    const { errors, wallet } = walletState;

    let errorCount: number = 0;

    if(wallet.address.trim() === "") {
      errors.address = FormError.MissingValue;
      errorCount++;
    } else if (!WalletStateValidator.validateAddress(wallet.symbol, wallet.address)) {
      errors.address = FormError.InvalidValue;
      errorCount++;
    }

    dispatch(WalletStateAction.SetErrors, errors);

    return errorCount === 0;
  }
}