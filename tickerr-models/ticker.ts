import firebase from "firebase/app";

import { ITickerChange } from "./tickerChange";

export interface ITicker {
  id: string;
  cap: number;
  change: ITickerChange;
  geckoID: string;
  name: string;
  price: number;
  supply: number;
  symbol: string;
  volume: number;
}

export const tickerConverter: any = {
  toFirestore(ticker: ITicker): firebase.firestore.DocumentData {
    return {
      cap: ticker.cap,
      change: ticker.change,
      geckoID: ticker.geckoID,
      name: ticker.name,
      price: ticker.price,
      supply: ticker.supply,
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
      geckoID: data.geckoID,
      name: data.name,
      price: data.price,
      supply: data.supply,
      symbol: data.symbol,      
      volume: data.volume
    }
  }
}