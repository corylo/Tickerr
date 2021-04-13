import { IGeckoCoinSymbolMapItem } from "../../../constants/gecko";
import { TickerUtility } from "../../../utilities/tickerUtility";

export interface ISearch {
  focused: boolean;
  index: number;
  results: IGeckoCoinSymbolMapItem[];  
  query: string;
}

export const defaultSearch = (): ISearch => ({
  focused: false,
  index: 0,
  results: TickerUtility.getDefaultSearchResults(), 
  query: ""
});