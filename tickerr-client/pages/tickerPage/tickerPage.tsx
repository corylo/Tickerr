import React, { useContext, useMemo, useReducer } from "react";
import { useRouteMatch } from "react-router";
import classNames from "classnames";

import { Page } from "../page/page";

import { NVpnClickinator } from "../../components/clickinator/nVpnClickinator";
import { TickerChart } from "./components/tickerChart/tickerChart";
import { TickerPrice } from "../../components/tickerPrice/tickerPrice";
import { TickerSidePanel } from "./components/tickerSidePanel/tickerSidePanel";

import { tickerStateReducer } from "./reducers/tickerStateReducer";

import { AppContext } from "../../components/app/contexts/appContext";
import { TickerStateContext } from "./contexts/tickerStateContext";

import { useUpdatePageTitleEffect } from "../../effects/appEffects";
import { useTickerEffect, useUpdateUrlSymbolEffect } from "../../effects/tickerEffects";

import { CurrencyUtility } from "../../utilities/currencyUtility";

import { ITickerChartPoint } from "../../../tickerr-models/tickerChartPoint";
import { defaultTickerState } from "./models/tickerState";

import { TickerStateAction } from "./enums/tickerStateAction";

interface TickerPageProps {
  
}

export const TickerPage: React.FC<TickerPageProps> = (props: TickerPageProps) => {
  const { appState } = useContext(AppContext);
  
  const [tickerState, dispatchToTickerState] = useReducer(tickerStateReducer, defaultTickerState());

  const { errorMessage, status, sidePanelToggled, ticker, urlSymbol } = tickerState;

  const dispatch = (type: TickerStateAction, payload?: any): void => dispatchToTickerState({ type, payload });

  const getPageTitle = (): string => {
    if(ticker) {
      return `${CurrencyUtility.formatCurrency(ticker.price, appState.settings.currency)} (${urlSymbol.toUpperCase()}) | Tickerr`;
    }

    return document.title;
  }

  useUpdatePageTitleEffect(getPageTitle());

  useUpdateUrlSymbolEffect(useRouteMatch(), dispatch);

  useTickerEffect(urlSymbol, appState.settings.currency, dispatch);

  const chart: ITickerChartPoint[] = ticker ? ticker.chart : [];

  const memoizedTickerChart = useMemo(() => <TickerChart ticker={ticker} />, [chart]);

  const getTickerStats = (): JSX.Element => {
    if(ticker) {
      const classes: string = classNames(
        CurrencyUtility.getChangeClass(ticker.change.day), {
        "side-panel-toggled": sidePanelToggled
      });

      return (
        <div id="ticker-stats" className={classes}>
          <TickerSidePanel />
          <div id="ticker-stats-price-wrapper">
            <TickerPrice value={ticker.price} change={ticker.change.day} />
          </div>
          <img id="ticker-stats-background-icon" src={ticker.icon.white} />
          {memoizedTickerChart}
        </div>
      )
    }
  }

  return(
    <TickerStateContext.Provider value={{ tickerState, dispatchToTickerState }}>
      <Page id="tickerr-ticker-page" status={status} errorMessage={errorMessage} backToHome>      
        {getTickerStats()}
        <NVpnClickinator closeable />
      </Page>
    </TickerStateContext.Provider>
  )
}