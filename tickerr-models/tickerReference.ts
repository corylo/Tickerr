import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";

export interface ITickerReference {
  geckoID: string;
  symbol: string;
}

export const tickerReferenceConverter: any = {
  toFirestore(ref: ITickerReference): DocumentData {
    return {
      geckoID: ref.geckoID
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<ITickerReference>): ITickerReference {
    const data: ITickerReference = snapshot.data();

    return {
      geckoID: data.geckoID,
      symbol: snapshot.id
    }
  }
}