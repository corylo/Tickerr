import { defaultWallet, IWallet } from "../../../../tickerr-models/wallet";
import { defaultWalletStateErrors, IWalletStateErrors } from "./walletStateErrors";

import { FormStatus } from "../../../enums/formStatus";

export interface IWalletState {  
  errors: IWalletStateErrors;
  status: FormStatus;
  statusMessage: string;
  wallet: IWallet;
}

export const defaultWalletState = (): IWalletState => ({  
  errors: defaultWalletStateErrors(),
  status: FormStatus.InProgress,
  statusMessage: "",
  wallet: defaultWallet()
});