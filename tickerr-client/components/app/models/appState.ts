import { defaultAppRequestStatuses, IAppRequestStatuses } from "./appRequestStatuses";
import { defaultAppToggles, IAppToggles } from "./appToggles";
import { ITicker } from "../../../../tickerr-models/ticker";
import { defaultUserSettings, IUserSettings } from "../../../../tickerr-models/userSettings";

export interface IAppState {
  settings: IUserSettings;
  statuses: IAppRequestStatuses;
  tickers: ITicker[];
  toggles: IAppToggles;
}

export const defaultAppState = (): IAppState => ({
  settings: defaultUserSettings(),
  statuses: defaultAppRequestStatuses(),
  tickers: [],
  toggles: defaultAppToggles()
})