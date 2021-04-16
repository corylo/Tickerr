import React, { useContext } from "react";
import { useHistory } from "react-router";

import { SearchContext } from "../../contexts/searchContext";

import { ISearchContext } from "../../models/searchContext";

import { ElementID } from "../../../../enums/elementId";
import { SearchAction } from "../../enums/searchAction";

interface SearchBarInputProps {  
  reference: React.MutableRefObject<HTMLInputElement>;
  clear: () => void;
}

export const SearchBarInput: React.FC<SearchBarInputProps> = (props: SearchBarInputProps) => {  
  const { search, dispatchToSearch } = useContext<ISearchContext>(SearchContext);

  const dispatch = (type: SearchAction, payload?: any): void => dispatchToSearch({ type, payload });

  const { focused, index, results, query } = search;

  const history: any = useHistory();

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

      props.clear();
    } else if (e.key === "Escape") {
      props.clear();
    }
  }

  return (
    <input 
      type="text" 
      ref={props.reference}
      id={ElementID.SearchBarInput}
      className="passion-one-font"
      value={query} 
      placeholder={focused ? "Search" : "Hit / to search"}
      onChange={(e: any) => dispatch(SearchAction.SetQuery, e.target.value)}
      onKeyDown={handleOnKeyDown}
      onFocus={() => dispatch(SearchAction.SetFocused, true)}
    />
  );
}