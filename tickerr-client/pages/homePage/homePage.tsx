import React, { useContext } from "react";

import { Page } from "../page/page";

import { NVpnClickinator } from "../../components/clickinator/nVpnClickinator";
import { TickerLink } from "../../components/tickerLink/tickerLink";
import { UpdateBanner } from "../../components/updateBanner/updateBanner";
import { UpdateBannerBody } from "../../components/updateBanner/updateBannerBody";
import { UpdateBannerIcon } from "../../components/updateBanner/updateBannerIcon";

import { AppContext } from "../../components/app/contexts/appContext";

import { useUpdatePageTitleEffect } from "../../effects/appEffects";
import { useTickersEffect } from "../../effects/tickerEffects";

import { ITicker } from "../../../tickerr-models/ticker";
import { AppStatus } from "../../components/app/enums/appStatus";

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

  const getUpdateBanner = (): JSX.Element => {
    if(appState.status === AppStatus.SignedOut) {
      return (
        <UpdateBanner>
          <UpdateBannerIcon icon="fad fa-sparkles" />
          <UpdateBannerBody>
            <h1 className="title">NEW</h1>
            <h1 className="text">Sign In to save your settings! More features coming soon!</h1>
          </UpdateBannerBody>
        </UpdateBanner>
      )
    }
  }
  
  return(
    <Page id="tickerr-home-page" status={status}>  
      <NVpnClickinator /> 
      {getUpdateBanner()}
      <h1 id="tickerr-percent-change-legend-text" className="passion-one-font">% change based on last <span className="text-highlight">24H</span></h1>
      {getTickerLinks()}  
      <NVpnClickinator />
      <h1 id="tickerr-username" className="passion-one-font">Made with ❤️ by vvaffleman</h1>
    </Page>
  )
}