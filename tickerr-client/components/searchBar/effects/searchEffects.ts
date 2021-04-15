import { useEffect } from "react";

import { TickerUtility } from "../../../utilities/tickerUtility";

import { IGeckoCoinSymbolMapItem } from "../../../constants/gecko";

import { SearchAction } from "../enums/searchAction";

export const useFocusSearchOnToggleEffect = (ref: React.MutableRefObject<HTMLInputElement>, toggled: boolean): void => {
  useEffect(() => {
    if(toggled) {
      ref.current.focus();
    }
  }, [toggled]);
}

export const useFilterSearchResultsEffect = (index: number, query: string, dispatch: (type: SearchAction, payload?: any) => void): void => {
  useEffect(() => {
    let results: IGeckoCoinSymbolMapItem[] = query.trim() !== ""
      ? TickerUtility.filterSearchResults(query)
      : TickerUtility.getDefaultSearchResults();

    dispatch(SearchAction.SetResults, results);

    if(index !== 0) {
      dispatch(SearchAction.SetIndex, 0);
    }
  }, [query]);
}