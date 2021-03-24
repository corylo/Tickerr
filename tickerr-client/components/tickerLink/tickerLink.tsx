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

  const handleOnClick = (): void => {
    AnalyticsUtility.log("ticker_link_click", ticker);
  }

  console.log(ticker.icon.color)

  return(
    <Link to={`/${ticker.symbol}`} className={classNames("ticker-link", SettingsUtility.getFontClass(appState.settings.font))} onClick={handleOnClick}>
      <h1 className="ticker-index passion-one-font">{ticker.rank}</h1>
      <img className="ticker-icon" src={ticker.icon.color} />
      <img className="ticker-background-icon" src={ticker.icon.white} />
      <div className="ticker-symbol-and-price">
        <h1 className="ticker-symbol">{ticker.symbol}</h1>
        <TickerPrice value={ticker.price} />
        <TickerChange change={ticker.change.day} />
      </div>
    </Link>
  )
}