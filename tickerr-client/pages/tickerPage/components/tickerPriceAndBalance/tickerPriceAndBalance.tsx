import React from "react";

import { TickerPrice } from "../../../../components/tickerPrice/tickerPrice";

import { ITicker } from "../../../../../tickerr-models/ticker";

interface TickerPriceAndBalanceProps {
  ticker: ITicker;
}

export const TickerPriceAndBalance: React.FC<TickerPriceAndBalanceProps> = (props: TickerPriceAndBalanceProps) => {
  return(
    <div className="ticker-price-and-balance">
      <TickerPrice value={props.ticker.price} change={props.ticker.change.day} />
    </div>
  )
}