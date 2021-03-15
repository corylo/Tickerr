import React from "react";
import { Link } from "react-router-dom";

import { ITicker } from "../../models/ticker";

interface TickerLinkProps {
  index: number;
  ticker: ITicker;
}

export const TickerLink: React.FC<TickerLinkProps> = (props: TickerLinkProps) => {
  return(
    <Link to={`/${props.ticker.symbol}`} className="ticker-link">
      <h1 className="ticker-index bangers-font">{props.index}</h1>
      <img className="ticker-icon" src={`/img/icons/color/${props.ticker.symbol}.svg`} />
      <h1 className="ticker-symbol bangers-font">{props.ticker.symbol}</h1>
    </Link>
  )
}