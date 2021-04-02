import { IAction } from "../../../models/action";
import { IAccountState } from "../models/accountState";

import { AccountStateAction } from "../enums/accountStateAction";
import { AuthErrorCode } from "../../../enums/authErrorCode";
import { AuthErrorCodeMessage } from "../../../enums/authErrorCodeMessage";
import { RequestStatus } from "../../../enums/requestStatus";

export const accountStateReducer = (state: IAccountState, action: IAction): IAccountState => {
  switch(action.type) {
    case AccountStateAction.CancelAccountDeletion:
      return {
        ...state,
        errorCode: AuthErrorCode.None,
        status: RequestStatus.Idle,
        statusMessage: "",
        toggles: {
          ...state.toggles,
          deletion: false
        }
      }
    case AccountStateAction.RecentLoginRequiredError:
      return {
        ...state,
        errorCode: AuthErrorCode.RecentLogin,
        status: RequestStatus.Error,
        statusMessage: AuthErrorCodeMessage.RecentLogin
      }
    case AccountStateAction.SetStatus:
      return {
        ...state,
        status: action.payload
      }
    case AccountStateAction.ToggleConfirmAccountDeletion:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          deletion: action.payload
        }
      }
    case AccountStateAction.UnknownError: {
      return {
        ...state,
        errorCode: AuthErrorCode.None,
        status: RequestStatus.Error,
        statusMessage: ""
      }
    }
    default:
      throw new Error(`Unknown action type in accountStateReducer: ${action.type}`);
  }
}