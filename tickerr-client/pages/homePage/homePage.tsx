import React from "react";

import { Page } from "../page/page";

import { NordVpnLongBannerAd } from "../../components/affiliateAd/nordVpnLongBannerAd";
import { TickerLink } from "../../components/tickerLink/tickerLink";

import { useUpdatePageTitleEffect } from "../../effects/appEffects";
import { useTickersEffect } from "../../effects/tickerEffects";

import { ITicker } from "../../../tickerr-models/ticker";

import { Currency } from "../../enums/currency";

interface HomePageProps {
  
}

export const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  useUpdatePageTitleEffect("Tickerr");

  const { tickers, status } = useTickersEffect(Currency.USD, 30);

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
      <NordVpnLongBannerAd />
      {getTickerLinks()}  
      <NordVpnLongBannerAd />
      <h1 id="tickerr-username">Made with ❤️ by vvaffleman</h1>
    </Page>
  )
}