import firebase from "firebase/app";

import { ITickerChange } from "./tickerChange";

export interface ITicker {
  id: string;
  cap: number;
  name: string;
  price: number;
  symbol: string;
  change: ITickerChange;
}

export const tickerConverter: firebase.firestore.FirestoreDataConverter<ITicker> = {
  toFirestore(ticker: ITicker): firebase.firestore.DocumentData {
    return {
      cap: ticker.cap,
      name: ticker.name,
      price: ticker.price,
      symbol: ticker.symbol,
      change: ticker.change
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): ITicker {
    const data: ITicker = snapshot.data(options) as ITicker;

    return {
      id: snapshot.id,
      cap: data.cap,
      name: data.name,
      price: data.price,
      symbol: data.symbol,
      change: data.change
    }
  }
}