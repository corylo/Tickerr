import { useEffect, useState } from "react";
import firebase from "firebase/app";

import { db } from "../firebase";

import { ITicker, tickerConverter } from "../models/ticker";

import { RequestStatus } from "../enums/requestStatus";

export interface IUseTickerListEffect {
  tickers: ITicker[];
  status: RequestStatus;
}

export const useTickerListEffect = (): IUseTickerListEffect => {
  const [tickers, setTickers] = useState<ITicker[]>([]),
    [status, setStatus] = useState<RequestStatus>(RequestStatus.Loading);

    useEffect(() => {
      const unsubscribeToTickers = db.collection("tickers")        
        .withConverter(tickerConverter)
        .onSnapshot((snap: firebase.firestore.QuerySnapshot) => { 
          try {
            let updatedTickers: ITicker[] = [];
  
            snap.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => 
              updatedTickers.push(doc.data() as ITicker));
  
            setTickers(updatedTickers);
  
            if(status !== RequestStatus.Success) {
              setStatus(RequestStatus.Success);
            }
          } catch (err) {
            console.error("useTickerListEffect:", err.message);
                
            setStatus(RequestStatus.Error);
          }
        }, (err: firebase.firestore.FirestoreError) => {
          console.error("useTickerListEffect:", err.message);
          
          setStatus(RequestStatus.Error);
        });
          
        return () => {
          unsubscribeToTickers();
        }
    }, []);
  return { tickers, status };
}