import React, { useContext } from "react";

import { Page } from "../page/page";

import { TickerLink } from "../../components/tickerLink/tickerLink";

import { AppContext } from "../../components/app/contexts/appContext";

import { useUpdatePageTitleEffect } from "../../effects/appEffects";
import { useFetchTickersOnIntervalEffect } from "../../effects/tickerEffects";

import { ITicker } from "../../../tickerr-models/ticker";

import { AppAction } from "../../enums/appAction";

interface HomePageProps {
  
}

export const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  const { appState, dispatchToApp } = useContext(AppContext);

  const { statuses, tickers } = appState;

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });

  useUpdatePageTitleEffect("Tickerr");
  
  useFetchTickersOnIntervalEffect(appState, 150, dispatch);

  const getTickerLinks = (): JSX.Element => {
    const links: JSX.Element[] = tickers
      .map((ticker: ITicker) => <TickerLink key={ticker.id} ticker={ticker} />);

    return (
      <div id="tickerr-home-page-ticker-links">
        {links}
      </div>
    );
  }

  return(
    <Page id="tickerr-home-page" status={statuses.tickers.is}>  
      <h1 id="tickerr-percent-change-legend-text" className="passion-one-font">% change based on last <span className="text-highlight">24H</span></h1>
      {getTickerLinks()}  
    </Page>
  )
}