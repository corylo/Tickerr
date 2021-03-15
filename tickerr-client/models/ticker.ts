import firebase from "firebase/app";

export interface ITicker {
  id: string;
  symbol: string;
  name: string;
}

export const tickerConverter: firebase.firestore.FirestoreDataConverter<ITicker> = {
  toFirestore(ticker: ITicker): firebase.firestore.DocumentData {
    return {      
      symbol: ticker.symbol,
      name: ticker.name
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): ITicker {
    const data: ITicker = snapshot.data(options) as ITicker;

    return {
      id: snapshot.id,
      symbol: data.symbol,
      name: data.name
    }
  }
}