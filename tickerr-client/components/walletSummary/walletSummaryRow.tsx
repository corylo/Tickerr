import React from "react";
import classNames from "classnames";

import { CurrencyUtility } from "../../utilities/currencyUtility";
import { SettingsUtility } from "../../utilities/settingsUtility";

import { ITicker } from "../../../tickerr-models/ticker";
import { IWallet } from "../../../tickerr-models/wallet";

import { Currency } from "../../../tickerr-enums/currency";
import { Font } from "../../../tickerr-enums/font";

interface WalletSummaryProps {  
  currency: Currency;
  font: Font;
  ticker: ITicker;
  wallet: IWallet;
}

export const WalletSummaryRow: React.FC<WalletSummaryProps> = (props: WalletSummaryProps) => {    
  const { ticker, wallet } = props;

  return (
    <tr className={classNames("tickerr-wallet-summary-row", SettingsUtility.getFontClass(props.font))}>
      <td className="tickerr-wallet-summary-row-icon-cell">
        <div className="tickerr-wallet-summary-row-icon">
          <img src={ticker.icon} />  
        </div>
      </td>
      <td className="tickerr-wallet-summary-row-symbol">{wallet.symbol}</td>
      <td className="tickerr-wallet-summary-row-balance">{CurrencyUtility.formatNumber(wallet.balance)}</td>
      <td className="tickerr-wallet-summary-row-price">{CurrencyUtility.formatCurrency(ticker.price, props.currency, 2)}</td>
      <td className="tickerr-wallet-summary-row-value">{CurrencyUtility.formatCurrency(wallet.balance * ticker.price, props.currency, 2)}</td>
    </tr>
  )
}