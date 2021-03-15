import firebase from "firebase/app";

import { ITickerChange } from "./tickerChange";

export interface ITicker {
  id: string;
  cap: number;
  change: ITickerChange;
  name: string;
  price: number;
  symbol: string;
  volume: number;
}

export const tickerConverter: firebase.firestore.FirestoreDataConverter<ITicker> = {
  toFirestore(ticker: ITicker): firebase.firestore.DocumentData {
    return {
      cap: ticker.cap,
      change: ticker.change,
      name: ticker.name,
      price: ticker.price,
      symbol: ticker.symbol,
      volume: ticker.volume
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
      change: data.change,
      name: data.name,
      price: data.price,
      symbol: data.symbol,      
      volume: data.volume
    }
  }
}