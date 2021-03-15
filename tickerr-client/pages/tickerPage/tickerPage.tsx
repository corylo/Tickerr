import React, { useEffect, useReducer } from "react";
import { useRouteMatch } from "react-router";
import classNames from "classnames";

import { Page } from "../page/page";

import { TickerPrice } from "../../components/tickerPrice/tickerPrice";
import { TickerSidePanel } from "./components/tickerSidePanel/tickerSidePanel";

import { tickerStateReducer } from "./reducers/tickerStateReducer";

import { TickerStateContext } from "./contexts/tickerStateContext";

import { useTickerEffect } from "../../effects/tickerEffects";

import { defaultTickerState } from "./models/tickerState";

import { TickerStateAction } from "./enums/tickerStateAction";
import { CurrencyUtility } from "../../utilities/currencyUtility";

interface TickerPageProps {
  
}

export const TickerPage: React.FC<TickerPageProps> = (props: TickerPageProps) => {
  const [tickerState, dispatchToTickerState] = useReducer(tickerStateReducer, defaultTickerState());

  const { ticker, status, sidePanelToggled, urlSymbol } = tickerState;

  const dispatch = (type: TickerStateAction, payload?: any): void => dispatchToTickerState({ type, payload });

  const match: any = useRouteMatch();

  useEffect(() => {
    if(
      match && 
      match.params && 
      match.params.symbol && 
      match.params.symbol.length > 1 && 
      match.params.symbol.length < 20
    ) {      
      dispatch(TickerStateAction.SetUrlSymbol, match.params.symbol);
    }
  }, []);

  useTickerEffect(urlSymbol, dispatch);

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
        </div>
      )
    }
  }

  return(
    <TickerStateContext.Provider value={{ tickerState, dispatchToTickerState }}>
      <Page id="tickerr-ticker-page" status={status}>      
        {getTickerStats()}
      </Page>
    </TickerStateContext.Provider>
  )
}