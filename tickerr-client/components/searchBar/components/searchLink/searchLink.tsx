import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { SettingsUtility } from "../../../../utilities/settingsUtility";
import { TickerUtility } from "../../../../utilities/tickerUtility";

import { ITickerIcon } from "../../../../../tickerr-models/tickerIcon";

import { Font } from "../../../../../tickerr-enums/font";
import { URL } from "../../../../enums/url";

import { IGeckoCoinSymbolMapItem } from "../../../../constants/gecko";

interface SearchLinkProps {  
  coin: IGeckoCoinSymbolMapItem;
  focused: boolean;
  font: Font;
  clear: () => void;
}

export const SearchLink: React.FC<SearchLinkProps> = (props: SearchLinkProps) => {  
  const icon: ITickerIcon = TickerUtility.getIcon(props.coin.symbol, props.coin.tracked);

  const classes: string = classNames(
    "tickerr-search-result", 
    SettingsUtility.getFontClass(props.font), { 
    focused: props.focused
  });

  return (
    <Link 
      to={`/${props.coin.symbol}`}
      onClick={props.clear}
      className={classes}
    >
      <img className="ticker-icon" src={`${URL.CDN}${icon.color}`} />
      <h1 className="ticker-name">{props.coin.name}</h1>
      <h1 className="ticker-symbol">{props.coin.symbol}</h1>
      <i className="fad fa-caret-right" />
    </Link>
  );
}