import React, { useContext } from "react";

import { TickerSidePanelField } from "./tickerSidePanelField";

import { TickerStateContext } from "../../contexts/tickerStateContext";

import { AnalyticsUtility } from "../../../../utilities/analyticsUtility";
import { CurrencyUtility } from "../../../../utilities/currencyUtility";

import { TickerStateAction } from "../../enums/tickerStateAction";

interface TickerSidePanelProps {
  
}

export const TickerSidePanel: React.FC<TickerSidePanelProps> = (props: TickerSidePanelProps) => {
  const { tickerState, dispatchToTickerState } = useContext(TickerStateContext);

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
        <img className="ticker-icon" src={ticker.icon.color} />
        <h1 className="ticker-symbol bangers-font">{ticker.symbol}</h1>
      </button>
      <div id="ticker-side-panel-details-wrapper">
        <div id="ticker-side-panel-details" className="scroll-bar">
          <TickerSidePanelField 
            value={ticker.name}
            label="Name" 
          />
          <TickerSidePanelField 
            value={CurrencyUtility.formatUSD(ticker.cap)} 
            label="Market Cap" 
          />
          <TickerSidePanelField 
            value={CurrencyUtility.formatUSD(ticker.volume)} 
            label="Day Volume" 
          />
          <TickerSidePanelField 
            value={CurrencyUtility.formatNumber(ticker.supply, 0, 2)} 
            label="Circulating Supply" 
          />
          <TickerSidePanelField 
            className={CurrencyUtility.getChangeClass(ticker.change.day)} 
            value={`${ticker.change.day.toFixed(2)}%`} 
            label="Day" 
          />
        </div>
      </div>
    </div>
  )
}