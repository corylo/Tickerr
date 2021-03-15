import firebase from "firebase/app";

import { ITicker } from "./ticker";

export interface ITickerSummary {
  id: string;
  top: ITicker[];
}

export const tickerSummaryConverter: any = {
  toFirestore(summary: ITickerSummary): firebase.firestore.DocumentData {
    return {
      top: summary.top
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): ITickerSummary {
    const data: ITickerSummary = snapshot.data(options) as ITickerSummary;

    return {
      id: snapshot.id,
      top: data.top
    }
  }
}