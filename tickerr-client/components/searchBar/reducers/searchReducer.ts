import { IAction } from "../../../models/action";
import { defaultSearch, ISearch } from "../models/search";

import { SearchAction } from "../enums/searchAction";

export const searchReducer = (state: ISearch, action: IAction): ISearch => {
  switch(action.type) {
    case SearchAction.ClearSearch:
      return defaultSearch();
    case SearchAction.SetFocused:
      return {
        ...state,
        focused: action.payload
      }
    case SearchAction.SetIndex:
      return {
        ...state,
        index: action.payload
      }
    case SearchAction.SetStatus:
      return {
        ...state,
        status: action.payload
      }
    case SearchAction.SetResults:
      return {
        ...state,
        results: action.payload
      }
    case SearchAction.SetQuery:
      return {
        ...state,
        query: action.payload
      }
    default:
      throw new Error(`Unknown action type in searchReducer: ${action.type}`);
  }
}