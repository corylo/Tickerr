import { IAppState } from "../models/appState";
import { IAction } from "../../../models/action";

import { AppAction } from "../enums/appAction";
import { AppStatus } from "../enums/appStatus";

export const appReducer = (state: IAppState, action: IAction): IAppState => {  
  switch (action.type) {
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
    case AppAction.SetSettings:
      return {
        ...state,
        settings: action.payload
      }
    case AppAction.SetStatus:
      return {
        ...state,
        status: action.payload
      }
    case AppAction.SetUser:
      return {
        ...state,
        user: action.payload
      }
    case AppAction.SignInUser:
      return {
        ...state,
        status: AppStatus.SignedIn,
        user: action.payload
      }
    case AppAction.ToggleSettings:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          settings: action.payload
        }
      }
    default:
      throw new Error(`Unknown action type in appReducer: ${action.type}`);
  }
}