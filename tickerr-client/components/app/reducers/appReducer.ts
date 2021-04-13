import { IAction } from "../../../models/action";
import { IAppState } from "../models/appState";
import { defaultUserSettings } from "../../../../tickerr-models/userSettings";

import { AppAction } from "../../../enums/appAction";
import { AppStatus } from "../enums/appStatus";
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
          menu: false,
          settings: false
        }
      }
    case AppAction.Cya:
      return {
        ...state,
        settings: defaultUserSettings(),
        toggles: {
          ...state.toggles,
          cya: true
        },
        user: null
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
        statuses: {
          ...state.statuses,
          settings: {
            is: RequestStatus.Idle,
            message: ""
          }
        },
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
    case AppAction.ToggleCya:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          cya: action.payload
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
    case AppAction.ToggleSearch:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          menu: false,
          search: action.payload
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