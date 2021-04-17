import { IAction } from "../../../models/action";
import { ITickerState } from "../models/tickerState";

import { RequestStatus } from "../../../enums/requestStatus";
import { TickerStateAction } from "../enums/tickerStateAction";

export const tickerStateReducer = (state: ITickerState, action: IAction): ITickerState => {
  switch(action.type) {
    case TickerStateAction.SetStatus:
      if(action.payload.errorMessage) {
        return {
          ...state,
          status: RequestStatus.Error,
          errorMessage: action.payload.errorMessage
        }
      }

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
    case TickerStateAction.SwitchTicker:
      return {
        ...state,
        ticker: null,
        urlSymbol: action.payload
      }
    case TickerStateAction.ToggleSidePanel:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          panel: action.payload
        }
      }
    case TickerStateAction.ToggleWallet:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          wallet: action.payload
        }
      }
    default:
      throw new Error(`Unknown action type in tickerStateReducer: ${action.type}`);
  }
}