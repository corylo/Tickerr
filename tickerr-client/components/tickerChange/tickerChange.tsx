import React from "react";
import classNames from "classnames";

import { CurrencyUtility } from "../../utilities/currencyUtility";

interface TickerChangeProps {  
  change: number;
}

export const TickerChange: React.FC<TickerChangeProps> = (props: TickerChangeProps) => {
  const value: string = Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(props.change)

  return(
    <h1 className={classNames("ticker-change passion-one-font", CurrencyUtility.getChangeClass(props.change))}>{value}%</h1>
  )
}