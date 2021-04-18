import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { TickerChange } from "../tickerChange/tickerChange";
import { TickerPrice } from "../tickerPrice/tickerPrice";

import { AppContext } from "../app/contexts/appContext";

import { AnalyticsUtility } from "../../utilities/analyticsUtility";
import { SettingsUtility } from "../../utilities/settingsUtility";

import { ITicker } from "../../../tickerr-models/ticker";

interface TickerLinkProps {
  ticker: ITicker;
}

export const TickerLink: React.FC<TickerLinkProps> = (props: TickerLinkProps) => {
  const { appState } = useContext(AppContext);

  const { ticker } = props;

  const handleOnClick = (e: any): void => {
    AnalyticsUtility.log("ticker_link_click", ticker);
  }

  return(
    <Link to={`/${ticker.symbol}`} className={classNames("ticker-link", SettingsUtility.getFontClass(appState.settings.font))} onClick={handleOnClick}>
      <h1 className="ticker-index">{ticker.rank}</h1>
      <div className="ticker-icon">
        <img src={ticker.icon} />  
      </div>
      <img className="ticker-background-icon" src={ticker.icon} />
      <div className="ticker-symbol-and-price">
        <h1 className="ticker-symbol">{ticker.symbol}</h1>
        <TickerPrice value={ticker.price} />
        <TickerChange change={ticker.change.day} />
      </div>
      <h1 className="ticker-name">{ticker.name}</h1>
    </Link>
  )
}