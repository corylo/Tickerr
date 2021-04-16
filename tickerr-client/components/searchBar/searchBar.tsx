import classNames from "classnames";
import React, { useContext, useReducer, useRef } from "react";

import { IconButton } from "../buttons/iconButton";
import { SearchBarInput } from "./components/searchBarInput/searchBarInput";
import { SearchLink } from "./components/searchLink/searchLink";

import { AppContext } from "../app/contexts/appContext";
import { SearchContext } from "./contexts/searchContext";

import { searchReducer } from "./reducers/searchReducer";

import { useOnClickAwayEffect } from "../../effects/appEffects";
import { useFilterSearchResultsEffect, useFocusSearchOnToggleEffect } from "./effects/searchEffects";

import { defaultSearch } from "./models/search";

import { IGeckoCoinSymbolMapItem } from "../../constants/gecko";

import { AppAction } from "../../enums/appAction";
import { ElementID } from "../../enums/elementId";
import { SearchAction } from "./enums/searchAction";

interface SearchBarProps {  
  
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const { search: toggled } = appState.toggles;

  const [search, dispatchToSearch] = useReducer(searchReducer, defaultSearch());

  const dispatch = (type: SearchAction, payload?: any): void => dispatchToSearch({ type, payload });

  const { focused, index, results, query } = search;

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

  const getResults = (): JSX.Element => {
    if(focused) {
      const links: JSX.Element[] = results.map((coin: IGeckoCoinSymbolMapItem, i: number) => (
        <SearchLink
          key={coin.symbol} 
          coin={coin}
          focused={index === i}
          font={appState.settings.font}
          clear={clear}
        />
      ));

      return (
        <div id="tickerr-search-results">
          {links}
        </div>
      )
    }
  }

  return (
    <SearchContext.Provider value={{ search, dispatchToSearch }}>
      <div id="tickerr-search-bar-wrapper" className={classNames({ toggled })}> 
        <div id="tickerr-search-bar"> 
          <IconButton
            id="tickerr-close-search-button"        
            icon="far fa-chevron-left"
            handleOnClick={() => dispatchToApp({ type: AppAction.ToggleSearch, payload: false })}
          />
          <SearchBarInput reference={ref} clear={clear} />
          {getResults()}
        </div>
      </div>
    </SearchContext.Provider>
  );
}