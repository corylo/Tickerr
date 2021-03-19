import React, { useContext } from "react";

import { Page } from "../page/page";

import { NVpnClickinator } from "../../components/clickinator/nVpnClickinator";
import { TickerLink } from "../../components/tickerLink/tickerLink";

import { AppContext } from "../../components/app/contexts/appContext";

import { useUpdatePageTitleEffect } from "../../effects/appEffects";
import { useTickersEffect } from "../../effects/tickerEffects";

import { ITicker } from "../../../tickerr-models/ticker";

interface HomePageProps {
  
}

export const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  const { appState } = useContext(AppContext);

  useUpdatePageTitleEffect("Tickerr");
  
  const { tickers, status } = useTickersEffect(appState, 30);

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
    <Page id="tickerr-home-page" status={status}>   
      <NVpnClickinator />
      {getTickerLinks()}  
      <NVpnClickinator />
      <h1 id="tickerr-username">Made with ❤️ by vvaffleman</h1>
    </Page>
  )
}