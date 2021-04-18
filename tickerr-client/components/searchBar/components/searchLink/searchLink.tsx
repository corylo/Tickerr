import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { SettingsUtility } from "../../../../utilities/settingsUtility";

import { Font } from "../../../../../tickerr-enums/font";

import { IGeckoCoinSymbolMapItem } from "../../../../constants/gecko";

interface SearchLinkProps {  
  coin: IGeckoCoinSymbolMapItem;
  focused: boolean;
  font: Font;
  clear: () => void;
}

export const SearchLink: React.FC<SearchLinkProps> = (props: SearchLinkProps) => {  
  const [imageError, setImageError] = useState<boolean>(false);

  const image: string = "";

  const classes: string = classNames(
    "tickerr-search-result", 
    SettingsUtility.getFontClass(props.font), { 
    focused: props.focused
  });

  const handleOnError = (): void => {
    setImageError(true);
  }

  const getImage = (): JSX.Element => {
    if(image !== "" && !imageError) {
      return (
        <img className="ticker-icon" src={image} onError={handleOnError} />
      )
    }
  }

  return (
    <Link 
      to={`/${props.coin.symbol}`}
      onClick={props.clear}
      className={classes}
    >
      {getImage()}
      <h1 className="ticker-name">{props.coin.name}</h1>
      <h1 className="ticker-symbol">{props.coin.symbol}</h1>
      <i className="fad fa-caret-right" />
    </Link>
  );
}