import { IAction } from "../../../models/action";
import { ISearch } from "./search";

export interface ISearchContext {
  search: ISearch;
  dispatchToSearch: (action: IAction) => void;
}