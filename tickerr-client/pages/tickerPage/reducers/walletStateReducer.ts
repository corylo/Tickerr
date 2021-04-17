import { IAction } from "../../../models/action";
import { defaultWalletState, IWalletState } from "../models/walletState";
import { IWalletStateErrors } from "../models/walletStateErrors";

import { FormError } from "../../../enums/formError";
import { WalletStateAction } from "../enums/walletStateAction";

export const walletStateReducer = (state: IWalletState, action: IAction): IWalletState => {
  let updatedErrors: IWalletStateErrors = { ...state.errors };

  switch(action.type) {
    case WalletStateAction.Clear:
      return defaultWalletState();
    case WalletStateAction.SetAddress:
      if(state.errors.address === FormError.MissingValue && action.payload.trim() !== "") {
        updatedErrors.address = FormError.None;
      }

      return {
        ...state,        
        errors: updatedErrors,
        wallet: {
          ...state.wallet,
          address: action.payload
        }
      }
    case WalletStateAction.SetErrors:
      return {
        ...state,
        errors: action.payload
      }
    case WalletStateAction.SetStatus:
      return {
        ...state,
        status: action.payload
      }
    case WalletStateAction.SetWallet:
      return {
        ...state,
        wallet: action.payload
      }
    default:
      throw new Error(`Unknown action type in walletStateReducer: ${action.type}`);
  }
}