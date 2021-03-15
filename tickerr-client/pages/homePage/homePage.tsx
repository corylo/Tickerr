import React from "react";

import { Page } from "../page/page";

import { TickerLink } from "../../components/tickerLink/tickerLink";

import { useTickerListEffect } from "../../effects/tickerEffects";

import { ITicker } from "../../models/ticker";

interface HomePageProps {
  
}

export const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  const { tickers, status } = useTickerListEffect();

  const getTickerLinks = (): JSX.Element[] => tickers
    .map((ticker: ITicker, index: number) => <TickerLink key={ticker.id} index={index + 1} ticker={ticker} />);

  return(
    <Page id="tickerr-home-page" status={status}>      
      <div id="tickerr-home-page-ticker-links">
        {getTickerLinks()}
      </div>
    </Page>
  )
}