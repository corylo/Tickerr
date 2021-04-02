import firebase from "firebase/app";

import { auth, db } from "../firebase";

import { UserUtility } from "../utilities/userUtility";

import { IUser, userConverter } from "../../tickerr-models/user";

interface IUserService {
  create: (firebaseUser: firebase.User) => Promise<void>;
  delete: () => Promise<void>;
  get: (uid: string) => Promise<IUser>;
  reauth: () => Promise<void>;
  update: (uid: string, updates: any) => Promise<void>;
}

export const UserService: IUserService = {
  create: async (firebaseUser: firebase.User): Promise<void> => {
    return await db
      .collection("users")     
      .doc(firebaseUser.uid)       
      .withConverter(userConverter)
      .set(UserUtility.mapUser(firebaseUser));
  },
  delete: async (): Promise<void> => {
    return await auth.currentUser.delete();
  },
  get: async (uid: string): Promise<IUser> => {        
    const doc: firebase.firestore.DocumentData = await db
      .collection("users")
      .doc(uid)
      .withConverter(userConverter)
      .get();

    if(doc.exists) {
      return doc.data() as IUser;
    }

    return null;
  },
  reauth: async (): Promise<void> => {
    return await auth.currentUser.reauthenticateWithRedirect(new firebase.auth.GoogleAuthProvider());
  },
  update: async (uid: string, updates: any): Promise<void> => {
    return await db
      .collection("users")     
      .doc(uid)       
      .withConverter(userConverter)
      .update(updates);
  }  
}