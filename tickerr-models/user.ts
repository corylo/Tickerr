import firebase from "firebase/app";

import { IUserSettings } from "./userSettings";
import { IWallet } from "./wallet";

export interface IUser {
  uid: string;
  email: string;
  image: string;
  name: string;
  settings: IUserSettings;
  wallets: IWallet[];
}

export const userConverter: firebase.firestore.FirestoreDataConverter<IUser> = {
  toFirestore(user: IUser): firebase.firestore.DocumentData {
    return {
      email: user.email,
      image: user.image,
      name: user.name,
      settings: user.settings,
      wallets: user.wallets
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): IUser {
    const data: IUser = snapshot.data(options) as IUser;

    return {
      uid: snapshot.id,
      email: data.email,
      image: data.image,
      name: data.name,
      settings: data.settings,
      wallets: data.wallets
    }
  }
}