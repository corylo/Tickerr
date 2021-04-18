import React, { useContext, useEffect, useState } from "react";

import { Button } from "../../../../components/buttons/button";
import { TickerSidePanelField } from "../tickerSidePanel/tickerSidePanelField";

import { AppContext } from "../../../../components/app/contexts/appContext";
import { TickerStateContext } from "../../contexts/tickerStateContext";

import { UserService } from "../../../../services/userService";
import { WalletService } from "../../../../services/walletService";

import { CurrencyUtility } from "../../../../utilities/currencyUtility";
import { DateUtility } from "../../../../utilities/dateUtility";
import { WalletUtility } from "../../../../utilities/walletUtility";

import { IWallet } from "../../../../../tickerr-models/wallet";

import { AppAction } from "../../../../enums/appAction";
import { AppStatus } from "../../../../components/app/enums/appStatus";
import { RequestStatus } from "../../../../enums/requestStatus";
import { TickerStateAction } from "../../enums/tickerStateAction";

interface WalletFieldsProps {
  
}

export const WalletFields: React.FC<WalletFieldsProps> = (props: WalletFieldsProps) => {
  const { appState, dispatchToApp } = useContext(AppContext),
    { tickerState, dispatchToTickerState } = useContext(TickerStateContext);

  const dispatch = (type: TickerStateAction, payload?: any): void => dispatchToTickerState({ type, payload });

  const { ticker } = tickerState;

  const wallet: IWallet | null = WalletUtility.getWallet(ticker.symbol, appState.user ? appState.user.wallets : []);

  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    if(wallet) {
      const interval: NodeJS.Timeout = setInterval(() => {
        const delta: number = Math.round((wallet.updatedAt + 30000 - new Date().getTime()) / 1000);
        
        if(delta >= 0 && countdown !== delta) {
          setCountdown(delta);
        } 
        
        if (delta < 0) {
          clearInterval(interval);
        }
      }, 100);

      return () => {
        clearInterval(interval);
      }
    }
  }, [countdown, wallet]);

  const updateBalance = async () => {      
    if(appState.statuses.wallet.is !== RequestStatus.Loading && WalletUtility.updateAvailable(wallet)) {
      try {  
        dispatchToApp({ type: AppAction.SetWalletStatus, payload: { is: RequestStatus.Loading, message: "" }});
        
        const balance: number = await WalletService.fetchBalance(ticker.symbol, wallet.address);

        const updatedWallets: IWallet[] = WalletUtility.updateWallets(WalletUtility.mapWallet(wallet, balance), appState.user.wallets);

        await UserService.update(appState.user.uid, { wallets: updatedWallets });

        dispatchToApp({ type: AppAction.SetUserWallets, payload: updatedWallets });

        dispatchToApp({ type: AppAction.SetWalletStatus, payload: { is: RequestStatus.Success, message: "" } });
      } catch (err) {
        console.error(err);

        dispatchToApp({ type: AppAction.SetWalletStatus, payload: { is: RequestStatus.Error, message: "" } });
      }
    }
  }

  if(wallet) {
    const getTooltip = (): string => {
      if(countdown <= 0) {
        return "Update";
      }

      return `Update in ${countdown}s`;
    }

    return (
      <React.Fragment>
        <TickerSidePanelField 
          value={CurrencyUtility.formatCurrency(wallet.balance * ticker.price, appState.settings.currency, 2)} 
          label="Wallet Value" 
          status={appState.statuses.wallet.is}
        />
        <TickerSidePanelField             
          actionIcon="fad fa-sync-alt"
          label={`Wallet Balance (${DateUtility.formatRelative(wallet.updatedAt / 1000)} ago)`} 
          value={CurrencyUtility.formatNumber(wallet.balance)}      
          status={appState.statuses.wallet.is}       
          tooltip={getTooltip()}
          handleOnAction={updateBalance}
        />
        <TickerSidePanelField 
          className="ticker-side-panel-wallet-address"
          label="Wallet Address" 
          value={wallet.address}             
          handleOnAction={() => dispatch(TickerStateAction.ToggleWallet, true)}
        />
      </React.Fragment>
    )
  }

  const available: boolean = WalletUtility.getAvailableWallets()
    .find((symbol: string) => symbol === ticker.symbol) !== undefined;

  if(available) {
    const handleOnClick = (): void => {
      if(appState.status === AppStatus.SignedIn) {
        dispatch(TickerStateAction.ToggleWallet, true);
      } else {
        dispatchToApp({ type: AppAction.ToggleSignIn, payload: true })
      }
    }

    return (      
      <Button id="ticker-add-wallet-button" handleOnClick={handleOnClick}>
        <i className="fad fa-plus" />
        <h1 className="passion-one-font">Add Wallet</h1>
      </Button>
    )
  }

  return null;
}