import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "@firebase/analytics";
import { Firestore, getFirestore } from "@firebase/firestore";

import { tickerrDevelopmentAppConfig, tickerrProductionAppConfig } from "../config/firebaseConfig";

const getConfig = (): any => {
  if (process.env.NODE_ENV === "production") {
    return tickerrProductionAppConfig;
  }
  
  return tickerrDevelopmentAppConfig;
};

initializeApp(getConfig());

export const analytics: Analytics = getAnalytics();
export const db: Firestore = getFirestore();