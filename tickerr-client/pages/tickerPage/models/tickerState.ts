import { ITicker } from "../../../../tickerr-models/ticker";
import { defaultTickerToggles, ITickerToggles } from "./tickerToggles";

import { RequestStatus } from "../../../enums/requestStatus";

export interface ITickerState {
  errorMessage: string;  
  status: RequestStatus;
  ticker: ITicker;
  toggles: ITickerToggles
  urlSymbol: string;
}

export const defaultTickerState = (): ITickerState => ({
  errorMessage: "",  
  status: RequestStatus.Loading,
  ticker: null,
  toggles: defaultTickerToggles(),
  urlSymbol: ""
});