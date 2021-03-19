import { defaultAppSettings, IAppSettings } from "./appSettings";
import { defaultAppToggles, IAppToggles } from "./appToggles";
import { ITickerrUser } from "../../../../tickerr-models/tickerrUser";

import { AppStatus } from "../enums/appStatus";

export interface IAppState {
  settings: IAppSettings;
  status: AppStatus;
  toggles: IAppToggles;
  user: ITickerrUser | null;
}

export const defaultAppState = (): IAppState => ({
  settings: defaultAppSettings(),
  status: AppStatus.Loading,
  toggles: defaultAppToggles(),
  user: null
})