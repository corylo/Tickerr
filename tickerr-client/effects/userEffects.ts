import { useEffect } from "react";

import { AppAction } from "../enums/appAction";
import { RequestStatus } from "../enums/requestStatus";

export const useFetchUserSettingsEffect = (dispatch: (type: AppAction, payload?: any) => void): void => {
  useEffect(() => {
    const settings: string | null = localStorage.getItem("settings");

    if(settings !== null) {
      dispatch(AppAction.InitSettings, JSON.parse(settings));
    } else {
      dispatch(AppAction.SetSettingsStatus, { is: RequestStatus.Idle, message: "" });
    }
  }, []);
}
