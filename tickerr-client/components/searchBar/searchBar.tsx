import classNames from "classnames";
import React, { useContext, useReducer, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { IconButton } from "../buttons/iconButton";

import { AppContext } from "../app/contexts/appContext";

import { searchReducer } from "./reducers/searchReducer";

import { SettingsUtility } from "../../utilities/settingsUtility";
import { TickerUtility } from "../../utilities/tickerUtility";

import { useOnClickAwayEffect } from "../../effects/appEffects";
import { useFilterSearchResultsEffect, useFocusSearchOnToggleEffect } from "./effects/searchEffects";

import { defaultSearch } from "./models/search";
import { ITickerIcon } from "../../../tickerr-models/tickerIcon";

import { IGeckoCoinSymbolMapItem } from "../../constants/gecko";

import { AppAction } from "../../enums/appAction";
import { ElementID } from "../../enums/elementId";
import { SearchAction } from "./enums/searchAction";
import { URL } from "../../enums/url";

interface SearchBarProps {  
  
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const { search: toggled } = appState.toggles;

  const [search, dispatchToSearch] = useReducer(searchReducer, defaultSearch());

  const dispatch = (type: SearchAction, payload?: any): void => dispatchToSearch({ type, payload });

  const { focused, index, results, query } = search;

  const history: any = useHistory();

  const ref: React.MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const clear = (): void => {
    ref.current.blur();

    dispatch(SearchAction.ClearSearch);

    if(toggled) {
      dispatchToApp({ type: AppAction.ToggleSearch, payload: false });
    }
  }

  useOnClickAwayEffect(
    focused, 
    [ElementID.SearchBarInput, "tickerr-search-results"], 
    [focused],
    clear
  );

  useFocusSearchOnToggleEffect(ref, toggled);

  useFilterSearchResultsEffect(index, query, dispatch);

  const handleOnKeyDown = (e: any): void => {   
    if(e.key === "Tab") {
      e.preventDefault();
    }

    if ((e.shiftKey && e.key === "Tab") || e.key === "ArrowUp") {
      dispatch(SearchAction.SetIndex, index === 0 ? results.length - 1 : index - 1);      
    } else if(e.key === "Tab" || e.key === "ArrowDown") {
      dispatch(SearchAction.SetIndex, index === results.length - 1 ? 0 : index + 1);      
    } else if (e.key === "Enter") {
      history.push(`/${results[index].symbol}`);

      clear();
    } else if (e.key === "Escape") {
      clear();
    }
  }

  const mapLinks = (results: IGeckoCoinSymbolMapItem[]): JSX.Element[] => {
    return results.map((coin: IGeckoCoinSymbolMapItem, i: number) => {
      const focused: boolean = index === i,
        icon: ITickerIcon = TickerUtility.getIcon(coin.symbol, coin.tracked);

      const classes: string = classNames(
        "tickerr-search-result", 
        SettingsUtility.getFontClass(appState.settings.font), { 
        focused 
      });

      return (
        <Link 
          key={coin.symbol} 
          to={`/${coin.symbol}`}
          onClick={clear}
          className={classes}
        >
          <img className="ticker-icon" src={`${URL.CDN}${icon.color}`} />
          <h1 className="ticker-name">{coin.name}</h1>
          <h1 className="ticker-symbol">{coin.symbol}</h1>
          <i className="fad fa-caret-right" />
        </Link>
      )
    });
  }

  const getResults = (): JSX.Element => {
    if(focused) {

      return (
        <div id="tickerr-search-results">
          {mapLinks(results)}
        </div>
      )
    }
  }

  const getPlaceholder = (): string => {
    return focused ? "Search" : "Hit / to search";
  }

  return (
    <div id="tickerr-search-bar-wrapper" className={classNames({ toggled })}> 
      <div id="tickerr-search-bar"> 
        <IconButton
          id="tickerr-close-search-button"        
          icon="far fa-chevron-left"
          handleOnClick={() => dispatchToApp({ type: AppAction.ToggleSearch, payload: false })}
        />
        <input 
          type="text" 
          ref={ref}
          id={ElementID.SearchBarInput}
          className="passion-one-font"
          value={query} 
          placeholder={getPlaceholder()}
          onChange={(e: any) => dispatch(SearchAction.SetQuery, e.target.value)}
          onKeyDown={handleOnKeyDown}
          onFocus={() => dispatch(SearchAction.SetFocused, true)}
        />
        {getResults()}
      </div>
    </div>
  );
}