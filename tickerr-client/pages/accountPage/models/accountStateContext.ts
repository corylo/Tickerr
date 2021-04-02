import { IAccountState } from "./accountState";
import { IAction } from "../../../models/action";

export interface IAccountStateContext {
  accountState: IAccountState;
  dispatchToAccountState: (action: IAction) => void;
}