import { IAction } from "../../../models/action";
import { ITickerState } from "../models/tickerState";

import { RequestStatus } from "../../../enums/requestStatus";
import { TickerStateAction } from "../enums/tickerStateAction";

export const tickerStateReducer = (state: ITickerState, action: IAction): ITickerState => {
  switch(action.type) {
    case TickerStateAction.SetStatus:
      return {
        ...state,
        status: action.payload
      }
    case TickerStateAction.SetTicker:
      return {
        ...state,
        ticker: action.payload,
        status: RequestStatus.Success
      }
    case TickerStateAction.SetUrlSymbol:
      return {
        ...state,
        urlSymbol: action.payload
      }
    case TickerStateAction.ToggleSidePanel:
      return {
        ...state,
        sidePanelToggled: action.payload
      }
    default:
      throw new Error(`Unknown action type in tickerStateReducer: ${action.type}`);
  }
}