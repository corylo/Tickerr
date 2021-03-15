import { ITicker } from "../../../models/ticker";

import { RequestStatus } from "../../../enums/requestStatus";

export interface ITickerState {
  sidePanelToggled: boolean;
  status: RequestStatus;
  ticker: ITicker;
  urlSymbol: string;
}

export const defaultTickerState = (): ITickerState => ({
  sidePanelToggled: false,
  status: RequestStatus.Loading,
  ticker: null,
  urlSymbol: ""
});