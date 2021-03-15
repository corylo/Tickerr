import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";

import { Page } from "../page/page";

import { TickerPrice } from "../../components/tickerPrice/tickerPrice";

import { useTickerEffect } from "../../effects/tickerEffects";

interface TickerPageProps {
  
}

export const TickerPage: React.FC<TickerPageProps> = (props: TickerPageProps) => {
  const [symbol, setSymbol] = useState<string>("");

  const match: any = useRouteMatch();

  useEffect(() => {
    if(
      match && 
      match.params && 
      match.params.symbol && 
      match.params.symbol.length > 1 && 
      match.params.symbol.length < 20
    ) {      
      setSymbol(match.params.symbol);
    }
  }, []);

  const { ticker, status } = useTickerEffect(symbol);

  const getTickerStats = (): JSX.Element => {
    if(ticker) {
      const green: boolean = ticker.change.day >= 0;

      return (
        <div id="ticker-stats" className={green ? "green" : "red"}>
          <TickerPrice value={ticker.price} green={green} />
        </div>
      )
    }
  }

  console.log(ticker, status)

  return(
    <Page id="tickerr-ticker-page" status={status}>      
      {getTickerStats()}
    </Page>
  )
}