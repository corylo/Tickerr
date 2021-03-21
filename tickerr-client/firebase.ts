import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

import { tickerrDevelopmentAppConfig, tickerrProductionAppConfig } from "../config/firebaseConfig";

const getConfig = (): any => {
  if (process.env.NODE_ENV === "production") {
    return tickerrProductionAppConfig;
  }
  
  return tickerrDevelopmentAppConfig;
};

firebase.initializeApp(getConfig());

export const db: firebase.firestore.Firestore = firebase.firestore();

export const analytics: firebase.analytics.Analytics = firebase.analytics();