import React, { useContext } from "react";
import classNames from "classnames";

import { TickerSidePanelField } from "./tickerSidePanelField";

import { AppContext } from "../../../../components/app/contexts/appContext";
import { TickerStateContext } from "../../contexts/tickerStateContext";

import { AnalyticsUtility } from "../../../../utilities/analyticsUtility";
import { CurrencyUtility } from "../../../../utilities/currencyUtility";
import { SettingsUtility } from "../../../../utilities/settingsUtility";

import { URL } from "../../../../enums/url";
import { TickerStateAction } from "../../enums/tickerStateAction";

interface TickerSidePanelProps {
  
}

export const TickerSidePanel: React.FC<TickerSidePanelProps> = (props: TickerSidePanelProps) => {
  const { appState } = useContext(AppContext),
    { tickerState, dispatchToTickerState } = useContext(TickerStateContext);

  const { ticker, sidePanelToggled } = tickerState;

  const handleOnClick = (): void => {
    const payload: boolean = !sidePanelToggled;

    dispatchToTickerState({ type: TickerStateAction.ToggleSidePanel, payload });

    AnalyticsUtility.log("ticker_side_panel_toggle", { toggled: payload, ticker });
  }

  return(
    <div id="ticker-side-panel">
      <button 
        id="ticker-icon-and-symbol" 
        onClick={handleOnClick}
      >
        <img className="ticker-icon" src={`${URL.CDN}${ticker.icon.color}`} />
        <h1 className={classNames("ticker-symbol", SettingsUtility.getFontClass(appState.settings.font))}>{ticker.symbol}</h1>
        <i className="fas fa-chevron-right" />
      </button>
      <div id="ticker-side-panel-details-wrapper">
        <div id="ticker-side-panel-details" className="scroll-bar">
          <TickerSidePanelField 
            value={ticker.rank.toString()}
            label="Rank" 
          />
          <TickerSidePanelField 
            value={ticker.name}
            label="Name" 
          />
          <TickerSidePanelField 
            value={CurrencyUtility.formatCurrency(ticker.cap, appState.settings.currency)} 
            label="Market Cap" 
          />
          <TickerSidePanelField 
            value={CurrencyUtility.formatCurrency(ticker.volume, appState.settings.currency)} 
            label="Day Volume" 
          />
          <TickerSidePanelField 
            value={CurrencyUtility.formatNumber(ticker.supply, 0, 2)} 
            label="Circulating Supply" 
          />
          <TickerSidePanelField 
            className={CurrencyUtility.getChangeClass(ticker.change.day)} 
            value={`${ticker.change.day.toFixed(2)}%`} 
            label="24H" 
          />
        </div>
      </div>
    </div>
  )
}