import firebase from "firebase/app";

import { defaultUserSettings } from "../../tickerr-models/userSettings";
import { IUser } from "../../tickerr-models/user";
import { IWallet } from "../../tickerr-models/wallet";

interface IUserUtility {
  getWallet: (symbol: string, wallets: IWallet[]) => IWallet | null;
  mapUpdatedWallet: (updatedWallet: IWallet, wallets: IWallet[]) => IWallet[];
  mapUser: (firebaseUser: firebase.User) => IUser;
}

export const UserUtility: IUserUtility = {
  getWallet: (symbol: string, wallets: IWallet[]): IWallet | null => {
    if(wallets) {
      return wallets.find((wallet: IWallet) => wallet.symbol === symbol) || null;
    }

    return null;
  },
  mapUpdatedWallet: (updatedWallet: IWallet, wallets: IWallet[]): IWallet[] => {
    if(wallets === undefined || wallets.length === 0) {
      return [updatedWallet];
    }

    return wallets.map((wallet: IWallet) => {
      if(wallet.symbol === updatedWallet.symbol) {
        return updatedWallet;
      }

      return wallet;
    });
  },
  mapUser: (firebaseUser: firebase.User): IUser => {
    return {
      uid: firebaseUser.uid, 
      email: firebaseUser.email,
      image: firebaseUser.photoURL,
      name: firebaseUser.displayName,
      settings: defaultUserSettings(),
      wallets: []
    }
  }
}