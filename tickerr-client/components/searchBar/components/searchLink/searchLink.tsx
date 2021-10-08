import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { SettingsUtility } from "../../../../utilities/settingsUtility";

import { Font } from "../../../../../tickerr-enums/font";

import { ITicker } from "../../../../../tickerr-models/ticker";

interface SearchLinkProps {  
  focused: boolean;
  font: Font;
  ticker: ITicker;
  clear: () => void;
}

export const SearchLink: React.FC<SearchLinkProps> = (props: SearchLinkProps) => {  
  const [imageError, setImageError] = useState<boolean>(false);

  const classes: string = classNames(
    "tickerr-search-link", 
    SettingsUtility.getFontClass(props.font), { 
    focused: props.focused
  });

  const handleOnError = (): void => {
    setImageError(true);
  }

  const getIcon = (): JSX.Element => {
    if(props.ticker.id === "" || imageError) {
      return (
        <div className="ticker-icon">                
          <i className="fal fa-coin" />
        </div>
      )
    }

    return (
      <div className="ticker-icon">                
        <img src={props.ticker.icon} onError={handleOnError} />
      </div>
    );
  }

  const getName = (): JSX.Element => {
    if(props.ticker.name !== "") {
      return (
        <h1 className="ticker-name">{props.ticker.name}</h1>
      )
    }
  }

  return (
    <Link 
      to={`/${props.ticker.symbol}`}
      onClick={props.clear}
      className={classes}
    >
      {getIcon()}
      {getName()}
      <h1 className="ticker-symbol">{props.ticker.symbol}</h1>
      <i className="fad fa-caret-right caret" />
    </Link>
  );
}