import { RequestStatus } from "../../../enums/requestStatus";

export interface IAppRequestStatus {
  is: RequestStatus;
  message: string;
}