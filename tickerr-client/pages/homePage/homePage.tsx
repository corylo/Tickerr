import React from "react";

import { Page } from "../page/page";

import { TickerLink } from "../../components/tickerLink/tickerLink";

import { useTickerSummaryEffect } from "../../effects/tickerEffects";

import { ITicker } from "../../../tickerr-models/ticker";

interface HomePageProps {
  
}

export const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  const { summary, status } = useTickerSummaryEffect();

  const getTickerLinks = (): JSX.Element => {
    if(summary) {
      const links: JSX.Element[] = summary.top
        .map((ticker: ITicker, index: number) => <TickerLink key={ticker.id} index={index + 1} ticker={ticker} />);

      return (
        <div id="tickerr-home-page-ticker-links">
          {links}
        </div>
      )
    }
  }
  
  return(
    <Page id="tickerr-home-page" status={status}>      
      {getTickerLinks()}
    </Page>
  )
}