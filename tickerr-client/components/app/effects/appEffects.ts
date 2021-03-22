import { useEffect } from "react";
import firebase from "firebase/app";

import { auth, db } from "../../../firebase";

import { UserUtility } from "../../../utilities/userUtility";

import { IAppState } from "../models/appState";
import { userConverter } from "../../../../tickerr-models/user";

import { AppAction } from "../../../enums/appAction";
import { AppStatus } from "../enums/appStatus";

export const useAuthStateChangedEffect = (dispatch: (type: AppAction, payload?: any) => void): void => {
  useEffect(() => {
    auth.onAuthStateChanged(async (firebaseUser: firebase.User) => {  
      dispatch(AppAction.SetStatus, AppStatus.Loading);
      
      if(firebaseUser) {
        const doc: firebase.firestore.DocumentData = await db
          .collection("users")
          .doc(firebaseUser.uid)
          .withConverter(userConverter)
          .get();

        if(doc.exists) {
          dispatch(AppAction.SignInUser, doc.data());
        } else {
          await db
            .collection("users")     
            .doc(firebaseUser.uid)       
            .withConverter(userConverter)
            .set(UserUtility.mapUser(firebaseUser));

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
    const settings: string | null = localStorage.getItem("settings");

    if(settings !== null) {
      dispatch(AppAction.SetSettings, JSON.parse(settings));
    }
  }, []);
}
