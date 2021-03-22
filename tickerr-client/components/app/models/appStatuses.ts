import { RequestStatus } from "../../../enums/requestStatus";

export interface IAppStatuses {  
  settings: RequestStatus;  
}

export const defaultAppStatuses = (): IAppStatuses => ({  
  settings: RequestStatus.Idle
});