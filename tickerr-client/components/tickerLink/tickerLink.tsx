import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { CurrencyUtility } from "../../utilities/currencyUtility";

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
      <div className="ticker-symbol-and-price">
        <h1 className="ticker-symbol bangers-font">{props.ticker.symbol}</h1>
        <h1 className={classNames("ticker-price", "bangers-font", props.ticker.change.day >= 0 ? "green" : "red")}>{CurrencyUtility.formatUSD(props.ticker.price)}</h1>
      </div>
    </Link>
  )
}