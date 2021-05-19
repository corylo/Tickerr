import React, { useContext } from "react";
import classNames from "classnames";

import { Table } from "../table/table";
import { WalletSummaryRow } from "./walletSummaryRow";

import { AppContext } from "../app/contexts/appContext";

import { CurrencyUtility } from "../../utilities/currencyUtility";
import { SettingsUtility } from "../../utilities/settingsUtility";
import { TickerUtility } from "../../utilities/tickerUtility";
import { WalletUtility } from "../../utilities/walletUtility";

import { ITicker } from "../../../tickerr-models/ticker";
import { IWallet } from "../../../tickerr-models/wallet";

interface WalletSummaryProps {  
  tickers: ITicker[];
}

export const WalletSummary: React.FC<WalletSummaryProps> = (props: WalletSummaryProps) => {    
  const { appState } = useContext(AppContext);

  if(appState.user && appState.user.wallets && appState.user.wallets.length > 0) {    
    const { settings, wallets } = appState.user;

    const getRows = (): JSX.Element[] => {
      return wallets.map((wallet: IWallet) =>                 
        <WalletSummaryRow 
          key={wallet.address} 
          currency={settings.currency}
          font={settings.font}
          ticker={TickerUtility.getTickerBySymbol(wallet.symbol, props.tickers)}
          wallet={wallet} 
        />        
      );
    }

    const getTotalRow = (): JSX.Element => {
      const total: number = WalletUtility.getCombinedValue(wallets, props.tickers);

      return (
        <tr className={classNames("tickerr-wallet-summary-row combined-value-row", SettingsUtility.getFontClass(settings.font))}>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td className="combined-value">{CurrencyUtility.formatCurrency(total, settings.currency, 2)}</td>
        </tr>
      )
    }

    return (
      <div id="tickerr-wallet-summary">
        <Table id="tickerr-wallet-summary-table">
          <thead>
            <tr className={SettingsUtility.getFontClass(settings.font)}>
              <th></th>
              <th>Name</th>
              <th>Balance</th>
              <th>Price</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {getRows()}
            {getTotalRow()}
          </tbody>
        </Table>
      </div>
    );
  }

  return null;
}