import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { TickerChange } from "../tickerChange/tickerChange";
import { TickerPrice } from "../tickerPrice/tickerPrice";

import { AppContext } from "../app/contexts/appContext";

import { AnalyticsUtility } from "../../utilities/analyticsUtility";
import { SettingsUtility } from "../../utilities/settingsUtility";

import { ITicker } from "../../../tickerr-models/ticker";

import { URL } from "../../enums/url";

interface TickerLinkProps {
  ticker: ITicker;
}

export const TickerLink: React.FC<TickerLinkProps> = (props: TickerLinkProps) => {
  const { appState } = useContext(AppContext);

  const { ticker } = props;

  const handleOnClick = (e: any): void => {
    if(ticker.exists) {
      AnalyticsUtility.log("ticker_link_click", ticker);
    } else {
      e.preventDefault();
    }
  }

  const getClasses = (): string => {
    return classNames(
      "ticker-link", 
      SettingsUtility.getFontClass(appState.settings.font), {
        disabled: !ticker.exists
      }
    );
  }

  const getDisabledMessage = (): JSX.Element => {
    if(!ticker.exists) {
      return (
        <div className="ticker-link-disabled-message">
          <div className="ticker-link-disabled-message-text">
            <h1 className="title">Will add soon!</h1>
            <h1 className="sub-title">(Need to upload assets and whatnot)</h1>
          </div>
        </div>
      )
    }
  }
  
  return(
    <Link to={`/${ticker.symbol}`} className={getClasses()} onClick={handleOnClick}>
      <h1 className="ticker-index">{ticker.rank}</h1>
      <img className="ticker-icon" src={`${URL.CDN}${ticker.icon.color}`} />
      <img className="ticker-background-icon" src={`${URL.CDN}${ticker.icon.white}`} />
      <div className="ticker-symbol-and-price">
        <h1 className="ticker-symbol">{ticker.symbol}</h1>
        <TickerPrice value={ticker.price} />
        <TickerChange change={ticker.change.day} />
      </div>
      <h1 className="ticker-name">{ticker.name}</h1>
      {getDisabledMessage()}
    </Link>
  )
}