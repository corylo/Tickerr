import { defaultAppStatuses, IAppStatuses } from "./appStatuses";
import { defaultAppToggles, IAppToggles } from "./appToggles";
import { IUser } from "../../../../tickerr-models/user";
import { defaultUserSettings, IUserSettings } from "../../../../tickerr-models/userSettings";

import { AppStatus } from "../enums/appStatus";

export interface IAppState {
  settings: IUserSettings;
  status: AppStatus;
  statuses: IAppStatuses;
  toggles: IAppToggles;
  user: IUser | null;
}

export const defaultAppState = (): IAppState => ({
  settings: defaultUserSettings(),
  status: AppStatus.Loading,
  statuses: defaultAppStatuses(),
  toggles: defaultAppToggles(),
  user: null
})