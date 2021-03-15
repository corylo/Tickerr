import React from "react";
import classNames from "classnames";

import { CurrencyUtility } from "../../utilities/currencyUtility";

interface TickerChangeProps {  
  change: number;
}

export const TickerChange: React.FC<TickerChangeProps> = (props: TickerChangeProps) => {
  const change: string = CurrencyUtility.formatNumber(props.change);

  return(
    <h1 className={classNames("ticker-change passion-one-font", CurrencyUtility.getChangeClass(props.change))}>{change}%</h1>
  )
}