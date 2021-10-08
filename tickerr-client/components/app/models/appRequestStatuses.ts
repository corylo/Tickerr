import { IAppRequestStatus } from "./appRequestStatus";

import { RequestStatus } from "../../../enums/requestStatus";

export interface IAppRequestStatuses {  
  settings: IAppRequestStatus;  
  tickers: IAppRequestStatus;  
}

export const defaultAppRequestStatuses = (): IAppRequestStatuses => ({  
  settings: {
    is: RequestStatus.Loading,
    message: ""
  },
  tickers: {
    is: RequestStatus.Loading,
    message: ""
  }
});