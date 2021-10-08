import { ITicker } from "../../../../tickerr-models/ticker";

import { RequestStatus } from "../../../enums/requestStatus";

export interface ISearch {
  focused: boolean;
  index: number;
  results: ITicker[];  
  query: string;
  status: RequestStatus;
}

export const defaultSearch = (): ISearch => ({
  focused: false,
  index: 0,
  results: [], 
  query: "",
  status: RequestStatus.Idle
});