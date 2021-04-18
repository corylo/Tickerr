import { useEffect } from "react"

import { WalletUtility } from "../../../utilities/walletUtility";

import { ITicker } from "../../../../tickerr-models/ticker";
import { ITickerToggles } from "../models/tickerToggles";
import { IUser } from "../../../../tickerr-models/user";
import { IWallet } from "../../../../tickerr-models/wallet";

import { WalletStateAction } from "../enums/walletStateAction";

export const useSetWalletEffect = (
  toggles: ITickerToggles, 
  ticker: ITicker, 
  user: IUser, 
  dispatch: (type: WalletStateAction, payload?: any) => void
): void => {
  useEffect(() => {
    if(toggles.wallet && ticker) {      
      const wallet: IWallet = WalletUtility.getWallet(ticker.symbol, user.wallets) || {
        address: "",
        balance: 0,
        updatedAt: 0,
        symbol: ticker.symbol
      };

      dispatch(WalletStateAction.SetWallet, wallet);
    } else {
      dispatch(WalletStateAction.Clear);
    }
  }, [toggles.wallet]);
}