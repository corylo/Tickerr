import { useEffect } from "react";

import { AppAction } from "../enums/appAction";
import { AppStatus } from "../enums/appStatus";

export const useFetchAppSettingsEffect = (dispatch: (type: AppAction, payload?: any) => void): void => {
  useEffect(() => {
    const settings: string | null = localStorage.getItem("settings");

    if(settings !== null) {
      dispatch(AppAction.SetSettings, JSON.parse(settings));
    }
    
    dispatch(AppAction.SetStatus, AppStatus.SignedIn);
  }, []);
}
