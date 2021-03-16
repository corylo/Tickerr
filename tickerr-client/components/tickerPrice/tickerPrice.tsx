import React from "react";
import classNames from "classnames";

import { CurrencyUtility } from "../../utilities/currencyUtility";

interface TickerPriceProps {
  value: number;
  change?: number;
}

export const TickerPrice: React.FC<TickerPriceProps> = (props: TickerPriceProps) => {
  const getClasses = (): string => {
    return classNames(
      "ticker-price", 
      "passion-one-font",       
      props.change ? CurrencyUtility.getChangeClass(props.change) : null, 
      `length-of-${props.value.toString().length}`
    );
  }

  return(
    <h1 className={getClasses()}>{CurrencyUtility.formatUSD(props.value)}</h1>
  )
}