import { useEffect } from "react"

import { UserUtility } from "../../../utilities/userUtility";

import { IAction } from "../../../models/action";
import { IAppState } from "../../../components/app/models/appState";
import { ITicker } from "../../../../tickerr-models/ticker";
import { ITickerToggles } from "../models/tickerToggles";
import { IUser } from "../../../../tickerr-models/user";
import { IWallet } from "../../../../tickerr-models/wallet";

import { AppAction } from "../../../enums/appAction";
import { RequestStatus } from "../../../enums/requestStatus";
import { WalletStateAction } from "../enums/walletStateAction";

export const useSetWalletEffect = (
  toggles: ITickerToggles, 
  ticker: ITicker, 
  user: IUser, 
  dispatch: (type: WalletStateAction, payload?: any) => void
): void => {
  useEffect(() => {
    if(toggles.wallet && ticker) {      
      const wallet: IWallet = UserUtility.getWallet(ticker.symbol, user.wallets) || {
        address: "",
        balance: 0,
        symbol: ticker.symbol
      };

      dispatch(WalletStateAction.SetWallet, wallet);
    } else {
      dispatch(WalletStateAction.Clear);
    }
  }, [toggles.wallet, ticker]);
}

export const useFetchWalletBalanceEffect = (
  appState: IAppState,
  ticker: ITicker,
  dispatchToApp: (action: IAction) => void
): void => {  
  const { statuses, user } = appState;

  useEffect(() => {
    if(ticker && user) {
      const wallet: IWallet | null = UserUtility.getWallet(ticker.symbol, user.wallets);

      if(wallet && statuses.wallet.is === RequestStatus.Idle) {
        const updatedWallets: IWallet[] = UserUtility.mapUpdatedWallet({
          ...wallet,
          balance: 10206
        }, user.wallets);

        dispatchToApp({ type: AppAction.SetWalletStatus, payload: RequestStatus.Success });

        dispatchToApp({ type: AppAction.SetUserWallets, payload: updatedWallets });
      }
    }
  }, [statuses.wallet.is, ticker, user]);
}