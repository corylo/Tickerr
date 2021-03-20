import React, { useContext } from "react";
import classNames from "classnames";

import { AppContext } from "../app/contexts/appContext";

import { CurrencyUtility } from "../../utilities/currencyUtility";
import { SettingsUtility } from "../../utilities/settingsUtility";

interface TickerPriceProps {
  value: number;
  change?: number;
}

export const TickerPrice: React.FC<TickerPriceProps> = (props: TickerPriceProps) => {
  const { appState } = useContext(AppContext);

  const formatted: string = CurrencyUtility.formatCurrency(props.value, appState.settings.currency);

  const getClasses = (): string => {
    return classNames(
      "ticker-price", 
      SettingsUtility.getFontClass(appState.settings.font),       
      props.change ? CurrencyUtility.getChangeClass(props.change) : null, 
      `length-of-${formatted.length}`
    );
  }

  return(
    <h1 className={getClasses()}>{formatted}</h1>
  )
}