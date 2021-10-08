import { useEffect } from "react";
import _sortBy from "lodash.sortby";

import { TickerUtility } from "../../../../tickerr-utilities/tickerUtility";

import { ISearch } from "../models/search";
import { ITicker } from "../../../../tickerr-models/ticker";

import { SearchAction } from "../enums/searchAction";

export const useFocusSearchOnToggleEffect = (ref: React.MutableRefObject<HTMLInputElement>, toggled: boolean): void => {
  useEffect(() => {
    if(toggled) {
      ref.current.focus();
    }
  }, [toggled]);
}

export const useFilterSearchResultsEffect = (search: ISearch, tickers: ITicker[], dispatch: (type: SearchAction, payload?: any) => void): void => {
  const { index, query, status } = search;

  useEffect(() => {    
    const filterSearchResults = (): ITicker[] => {
      if(query.trim() === "") {
        return tickers.slice(0, 5);
      }

      const filtered: ITicker[] = _sortBy(TickerUtility.filterSearchResults(query, tickers), "name");

      if(filtered.length > 0) {
        return filtered;
      }

      return [TickerUtility.mapTickerPlaceholder(query)]
    }

    dispatch(SearchAction.SetResults, filterSearchResults());

    if(index !== 0) {
      dispatch(SearchAction.SetIndex, 0);
    }
  }, [query, status]);
}