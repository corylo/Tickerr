import React from "react";
import { Link } from "react-router-dom";

import { TickerChange } from "../tickerChange/tickerChange";
import { TickerPrice } from "../tickerPrice/tickerPrice";

import { ITicker } from "../../../tickerr-models/ticker";

interface TickerLinkProps {
  index: number;
  ticker: ITicker;
}

export const TickerLink: React.FC<TickerLinkProps> = (props: TickerLinkProps) => {
  const { ticker } = props;

  return(
    <Link to={`/${ticker.symbol}`} className="ticker-link">
      <h1 className="ticker-index passion-one-font">{props.index}</h1>
      <img className="ticker-icon" src={`/img/icons/color/${ticker.symbol}.svg`} />
      <img className="ticker-background-icon" src={`/img/icons/white/${ticker.symbol}.svg`} />
      <div className="ticker-symbol-and-price">
        <h1 className="ticker-symbol bangers-font">{ticker.symbol}</h1>
        <TickerPrice value={ticker.price} />
        <TickerChange change={ticker.change.day} />
      </div>
    </Link>
  )
}