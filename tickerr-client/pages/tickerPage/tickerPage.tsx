import React, { useMemo, useReducer } from "react";
import { useRouteMatch } from "react-router";
import classNames from "classnames";

import { Page } from "../page/page";

import { TickerChart } from "./components/tickerChart/tickerChart";
import { TickerPrice } from "../../components/tickerPrice/tickerPrice";
import { TickerSidePanel } from "./components/tickerSidePanel/tickerSidePanel";

import { tickerStateReducer } from "./reducers/tickerStateReducer";

import { TickerStateContext } from "./contexts/tickerStateContext";

import { useUpdatePageTitleEffect } from "../../effects/appEffects";
import { useTickerEffect, useUpdateUrlSymbolEffect } from "../../effects/tickerEffects";

import { CurrencyUtility } from "../../utilities/currencyUtility";

import { defaultTickerState } from "./models/tickerState";

import { TickerStateAction } from "./enums/tickerStateAction";
import { ITickerChartPoint } from "../../../tickerr-models/tickerChartPoint";

interface TickerPageProps {
  
}

export const TickerPage: React.FC<TickerPageProps> = (props: TickerPageProps) => {
  const [tickerState, dispatchToTickerState] = useReducer(tickerStateReducer, defaultTickerState());

  const { errorMessage, status, sidePanelToggled, ticker, urlSymbol } = tickerState;

  const dispatch = (type: TickerStateAction, payload?: any): void => dispatchToTickerState({ type, payload });

  const getPageTitle = (): string => {
    if(ticker) {
      return `${CurrencyUtility.formatUSD(ticker.price)} (${urlSymbol.toUpperCase()}) | Tickerr`;
    }

    return document.title;
  }

  useUpdatePageTitleEffect(getPageTitle());

  useUpdateUrlSymbolEffect(useRouteMatch(), dispatch);

  useTickerEffect(urlSymbol, dispatch);

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
          <img id="ticker-stats-background-icon" src={`/img/icons/white/${ticker.symbol}.svg`} />
          {memoizedTickerChart}
        </div>
      )
    }
  }

  return(
    <TickerStateContext.Provider value={{ tickerState, dispatchToTickerState }}>
      <Page id="tickerr-ticker-page" status={status} errorMessage={errorMessage}>      
        {getTickerStats()}
      </Page>
    </TickerStateContext.Provider>
  )
}