import { IAction } from "../../../models/action";
import { IAppState } from "../models/appState";

import { AppAction } from "../../../enums/appAction";
import { RequestStatus } from "../../../enums/requestStatus";

export const appReducer = (state: IAppState, action: IAction): IAppState => {  
  switch (action.type) {    
    case AppAction.CloseSettings:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          settings: {
            is: RequestStatus.Idle,
            message: ""
          }
        },
        toggles: {
          ...state.toggles,
          settings: false
        }
      }
    case AppAction.InitSettings:      
      return {
        ...state,
        settings: action.payload,
        statuses: {
          ...state.statuses,
          settings: {
            is: RequestStatus.Idle,
            message: ""
          }
        }
      }
    case AppAction.SetCurrency:
      return {
        ...state,
        settings: {
          ...state.settings,
          currency: action.payload
        }
      }
    case AppAction.SetFont:
      return {
        ...state,
        settings: {
          ...state.settings,
          font: action.payload
        }
      }
    case AppAction.SetSettingsStatus:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          settings: action.payload
        }
      }
    case AppAction.SetTickersStatus:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          tickers: action.payload
        }
      }
    case AppAction.FetchedTickers:
      return {
        ...state,
        tickers: action.payload,
        statuses: {
          ...state.statuses,
          tickers: {
            is: RequestStatus.Success,
            message: ""
          }
        }
      }
    case AppAction.ToggleSearch:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          search: action.payload
        }
      }
    case AppAction.ToggleSettings:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          settings: action.payload
        }
      }
    case AppAction.UpdateSettings:
      return {
        ...state,
        settings: action.payload,
        statuses: {
          ...state.statuses,
          settings: {
            is: RequestStatus.Success,
            message: "Saved!"
          }
        }
      }
    default:
      throw new Error(`Unknown action type in appReducer: ${action.type}`);
  }
}