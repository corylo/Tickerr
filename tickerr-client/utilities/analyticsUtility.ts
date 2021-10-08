import { logEvent } from "firebase/analytics";

import { analytics } from "../firebase";

interface IAnalyticsUtility {
  log: (event: string, params?: any) => void;
}

export const AnalyticsUtility: IAnalyticsUtility = {
  log: (event: string, params?: any): void => {
    if(params) {
      logEvent(analytics, event, params);
    } else {
      logEvent(analytics, event);
    }
  }
}