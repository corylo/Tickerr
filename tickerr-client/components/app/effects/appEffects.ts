import { useEffect } from "react";
import firebase from "firebase/app";

import { auth } from "../../../firebase";

import { UserService } from "../../../services/userService";

import { IAppState } from "../models/appState";
import { IUser } from "../../../../tickerr-models/user";

import { AppAction } from "../../../enums/appAction";
import { AppStatus } from "../enums/appStatus";

export const useAuthStateChangedEffect = (appState: IAppState, dispatch: (type: AppAction, payload?: any) => void): void => {
  useEffect(() => {
    auth.onAuthStateChanged(async (firebaseUser: firebase.User) => {  
      if(appState.status !== AppStatus.Loading) {
        dispatch(AppAction.SetStatus, AppStatus.Loading);
      }
      
      if(firebaseUser) {
        const user: IUser = await UserService.get(firebaseUser.uid);

        if(user) {
          dispatch(AppAction.SignInUser, user);
        } else {
          await UserService.create(firebaseUser);

          location.reload();
        }
      } else {
        dispatch(AppAction.SetStatus, AppStatus.SignedOut);
      }
    });
  }, []);
}

export const useFetchUserSettingsEffect = (appState: IAppState, dispatch: (type: AppAction, payload?: any) => void): void => {
  useEffect(() => {
    if(appState.status === AppStatus.SignedOut) {
      const settings: string | null = localStorage.getItem("settings");

      if(settings !== null) {
        dispatch(AppAction.SetSettings, JSON.parse(settings));
      }
    }
  }, [appState.status]);
}
