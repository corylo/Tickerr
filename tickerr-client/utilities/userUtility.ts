import firebase from "firebase/app";

import { defaultUserSettings } from "../../tickerr-models/userSettings";
import { IUser } from "../../tickerr-models/user";

interface IUserUtility {
  mapUser: (firebaseUser: firebase.User) => IUser;
}

export const UserUtility: IUserUtility = {
  mapUser: (firebaseUser: firebase.User): IUser => {
    return {
      uid: firebaseUser.uid, 
      email: firebaseUser.email || "",
      image: firebaseUser.photoURL,
      name: firebaseUser.displayName,
      settings: defaultUserSettings(),
      wallets: []
    }
  },
}