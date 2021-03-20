import React, { useContext } from "react";
import classNames from "classnames";

import { AppContext } from "../app/contexts/appContext";

import { CurrencyUtility } from "../../utilities/currencyUtility";
import { SettingsUtility } from "../../utilities/settingsUtility";

interface TickerChangeProps {  
  change: number;
}

export const TickerChange: React.FC<TickerChangeProps> = (props: TickerChangeProps) => {
  const { appState } = useContext(AppContext);

  const change: string = CurrencyUtility.formatNumber(props.change);

  return(
    <h1 className={classNames("ticker-change", SettingsUtility.getFontClass(appState.settings.font), CurrencyUtility.getChangeClass(props.change))}>{change}%</h1>
  )
}