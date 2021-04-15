import { useEffect } from "react";
import firebase from "firebase/app";

import { auth } from "../firebase";

import { UserService } from "../services/userService";

import { IAppState } from "../components/app/models/appState";
import { IUser } from "../../tickerr-models/user";

import { AppAction } from "../enums/appAction";
import { AppStatus } from "../components/app/enums/appStatus";
import { RequestStatus } from "../enums/requestStatus";

export const useAuthStateChangedEffect = (appState: IAppState, dispatch: (type: AppAction, payload?: any) => void): void => {
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (firebaseUser: firebase.User) => {  
      if(firebaseUser && appState.user === null) {
        const user: IUser = await UserService.get(firebaseUser.uid);

        if(user) {
          dispatch(AppAction.SignInUser, user);
        } else {
          await UserService.create(firebaseUser);

          location.reload();
        }
      } else if (appState.user === null) {
        dispatch(AppAction.SetStatus, AppStatus.SignedOut);
      }
    });

    return () => unsub();
  }, [appState.user]);
}

export const useFetchUserSettingsEffect = (appState: IAppState, dispatch: (type: AppAction, payload?: any) => void): void => {
  useEffect(() => { 
    if(appState.status === AppStatus.SignedOut) {
      const settings: string | null = localStorage.getItem("settings");

      if(settings !== null) {
        dispatch(AppAction.InitSettings, JSON.parse(settings));
      } else {
        dispatch(AppAction.SetSettingsStatus, { is: RequestStatus.Idle, message: "" });
      }
    }
  }, [appState.status]);
}
