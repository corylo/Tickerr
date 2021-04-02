import { defaultAccountStateToggles, IAccountStateToggles } from "./accountStateToggles";

import { AuthErrorCode } from "../../../enums/authErrorCode";
import { RequestStatus } from "../../../enums/requestStatus";

export interface IAccountState {  
  errorCode: AuthErrorCode;
  status: RequestStatus;
  statusMessage: string;
  toggles: IAccountStateToggles;
}

export const defaultAccountState = (): IAccountState => ({
  errorCode: AuthErrorCode.None,
  status: RequestStatus.Idle,
  statusMessage: "",
  toggles: defaultAccountStateToggles()
});