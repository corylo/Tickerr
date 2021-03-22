import { IAppState } from "../models/appState";
import { IAction } from "../../../models/action";

import { AppAction } from "../../../enums/appAction";
import { AppStatus } from "../enums/appStatus";
import { RequestStatus } from "../../../enums/requestStatus";
import { defaultUserSettings } from "../../../../tickerr-models/userSettings";

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
        settings: action.payload,
        statuses: {
          ...state.statuses,
          settings: RequestStatus.Success
        }
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
    case AppAction.SetSettingsStatus:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          settings: action.payload
        }
      }
    case AppAction.SignInUser:
      return {
        ...state,
        settings: action.payload.settings,
        status: AppStatus.SignedIn,
        user: action.payload
      }
    case AppAction.SignOutUser:
      return {
        ...state,
        settings: defaultUserSettings(),
        status: AppStatus.SignedOut,
        user: null
      }
    case AppAction.StartSignOutUser:
      return {
        ...state,        
        status: AppStatus.Loading,
        toggles: {
          ...state.toggles,
          menu: false
        }
      }
    case AppAction.ToggleMenu:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          menu: action.payload
        }
      }
    case AppAction.ToggleSettings:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          menu: false,
          settings: action.payload
        }
      }
    case AppAction.ToggleSignIn:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          signIn: action.payload
        }
      }
    default:
      throw new Error(`Unknown action type in appReducer: ${action.type}`);
  }
}