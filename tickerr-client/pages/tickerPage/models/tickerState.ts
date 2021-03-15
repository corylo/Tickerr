import { ITicker } from "../../../../tickerr-models/ticker";

import { RequestStatus } from "../../../enums/requestStatus";

export interface ITickerState {
  errorMessage: string;
  sidePanelToggled: boolean;
  status: RequestStatus;
  ticker: ITicker;
  urlSymbol: string;
}

export const defaultTickerState = (): ITickerState => ({
  errorMessage: "",
  sidePanelToggled: false,
  status: RequestStatus.Loading,
  ticker: null,
  urlSymbol: ""
});