import { IAction } from "../../../models/action";
import { ITickerState } from "../models/tickerState";

export interface ITickerStateContext {
  tickerState: ITickerState;
  dispatchToTickerState: (action: IAction) => void;
}