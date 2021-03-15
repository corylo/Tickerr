import React from "react";
import classNames from "classnames";

import { CurrencyUtility } from "../../utilities/currencyUtility";

interface TickerPriceProps {
  value: number;
  green: boolean;
}

export const TickerPrice: React.FC<TickerPriceProps> = (props: TickerPriceProps) => {
  const getClasses = (): string => {
    return classNames(
      "ticker-price", 
      "bangers-font",       
      props.green ? "green" : "red", 
      `length-of-${props.value.toString().length}`
    );
  }

  return(
    <h1 className={getClasses()}>{CurrencyUtility.formatUSD(props.value)}</h1>
  )
}