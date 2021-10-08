import classNames from "classnames";
import React, { useContext, useEffect, useReducer, useRef } from "react";

import { IconButton } from "../buttons/iconButton";
import { LoadingIcon } from "../loadingIcon/loadingIcon";
import { SearchBarInput } from "./components/searchBarInput/searchBarInput";
import { SearchLink } from "./components/searchLink/searchLink";

import { AppContext } from "../app/contexts/appContext";
import { SearchContext } from "./contexts/searchContext";

import { searchReducer } from "./reducers/searchReducer";

import { useOnClickAwayEffect } from "../../effects/appEffects";
import { useFilterSearchResultsEffect, useFocusSearchOnToggleEffect } from "./effects/searchEffects";

import { TickerService } from "../../services/tickerService";

import { defaultSearch } from "./models/search";
import { ITicker } from "../../../tickerr-models/ticker";

import { AppAction } from "../../enums/appAction";
import { ElementID } from "../../enums/elementId";
import { RequestStatus } from "../../enums/requestStatus";
import { SearchAction } from "./enums/searchAction";

interface SearchBarProps {  
  
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const { settings, tickers, toggles } = appState;

  const [search, dispatchToSearch] = useReducer(searchReducer, defaultSearch());

  const dispatch = (type: SearchAction, payload?: any): void => dispatchToSearch({ type, payload });

  const { focused, index, query, results, status } = search;

  const ref: React.MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const clear = (): void => {
    ref.current.blur();

    dispatch(SearchAction.ClearSearch);

    if(toggles.search) {
      dispatchToApp({ type: AppAction.ToggleSearch, payload: false });
    }
  }

  useOnClickAwayEffect(
    focused, 
    [ElementID.SearchBarInput, "tickerr-search-results"], 
    [focused],
    clear
  );

  useFocusSearchOnToggleEffect(ref, toggles.search);

  useFilterSearchResultsEffect(search, tickers, dispatch);

  useEffect(() => {
    if(focused && status === RequestStatus.Idle) {
      const fetch = async (): Promise<void> => {
        try {
          if(
            (tickers.length === 0 && query.trim() === "") ||
            (tickers.length === 5 && query.trim() !== "")
          ) {
            const limit: number = tickers.length === 0 ? 5 : 150;

            dispatch(SearchAction.SetStatus, RequestStatus.Loading);

            const results: ITicker[] = await TickerService.fetchTickers(settings.currency, limit);

            dispatchToApp({ type: AppAction.FetchedTickers, payload: results });
            
            dispatch(SearchAction.SetStatus, RequestStatus.Idle);
          }
        } catch (err) {
          console.error(err);

          dispatch(SearchAction.SetStatus, RequestStatus.Idle);
        }
      }

      fetch();
    }
  }, [focused, query, status]);

  const getResults = (): JSX.Element => {
    if(focused) {
      const links: JSX.Element[] = results.map((ticker: ITicker, i: number) => (
        <SearchLink
          key={ticker.symbol} 
          focused={index === i}
          font={appState.settings.font}
          ticker={ticker}
          clear={clear}
        />
      ));

      return (
        <div id="tickerr-search-results" className="scroll-bar">
          {links}
        </div>
      )
    }
  }

  const getLoadingIcon = (): JSX.Element => {
    if(search.status === RequestStatus.Loading) {
      return (
        <LoadingIcon />
      )
    }
  }

  return (
    <SearchContext.Provider value={{ search, dispatchToSearch }}>
      <div id="tickerr-search-bar-wrapper" className={classNames({ toggled: toggles.search })}> 
        <div id="tickerr-search-bar"> 
          <IconButton
            id="tickerr-close-search-button"        
            icon="far fa-chevron-left"
            handleOnClick={() => dispatchToApp({ type: AppAction.ToggleSearch, payload: false })}
          />
          <SearchBarInput reference={ref} clear={clear} />
          {getLoadingIcon()}
          {getResults()}
        </div>
      </div>
    </SearchContext.Provider>
  );
}