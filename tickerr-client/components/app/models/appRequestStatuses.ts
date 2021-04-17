import { IAppRequestStatus } from "./appRequestStatus";

import { RequestStatus } from "../../../enums/requestStatus";

export interface IAppRequestStatuses {  
  settings: IAppRequestStatus;  
  wallet: IAppRequestStatus;  
}

export const defaultAppRequestStatuses = (): IAppRequestStatuses => ({  
  settings: {
    is: RequestStatus.Loading,
    message: ""
  },
  wallet: {
    is: RequestStatus.Idle,
    message: ""
  }
});