import firebase from "firebase/app";

import { ITickerChange } from "./tickerChange";
import { ITickerChartPoint } from "./tickerChartPoint";
import { ITickerIcon } from "./tickerIcon";

export interface ITicker {
  id: string;
  cap: number; 
  change: ITickerChange;
  chart: ITickerChartPoint[];
  geckoID: string;
  icon: ITickerIcon;
  name: string;
  price: number;
  rank: number;
  supply: number;
  symbol: string;
  volume: number;
}

export const tickerConverter: any = {
  toFirestore(ticker: ITicker): firebase.firestore.DocumentData {
    return {
      cap: ticker.cap,
      change: ticker.change,
      chart: ticker.chart,
      geckoID: ticker.geckoID,
      icon: ticker.icon,
      name: ticker.name,
      price: ticker.price,
      rank: ticker.rank,
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
      chart: data.chart,
      geckoID: data.geckoID,
      icon: data.icon,
      name: data.name,
      price: data.price,
      rank: data.rank,
      supply: data.supply,
      symbol: data.symbol,      
      volume: data.volume
    }
  }
}