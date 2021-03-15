import { useEffect, useState } from "react";
import firebase from "firebase/app";

import { db } from "../firebase";

import { ITicker, tickerConverter } from "../models/ticker";

import { RequestStatus } from "../enums/requestStatus";

interface IUseTickerListEffect {
  tickers: ITicker[];
  status: RequestStatus;
}

export const useTickerListEffect = (): IUseTickerListEffect => {
  const [tickers, setTickers] = useState<ITicker[]>([]),
    [status, setStatus] = useState<RequestStatus>(RequestStatus.Loading);

    useEffect(() => {
      const unsubscribeToTickers = db.collection("tickers")   
        .orderBy("cap", "desc")     
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

interface IUseTickerEffect {
  ticker: ITicker;
  status: RequestStatus;
}

export const useTickerEffect = (symbol: string): IUseTickerEffect => {
  const [ticker, setTicker] = useState<ITicker>(null),
    [status, setStatus] = useState<RequestStatus>(RequestStatus.Loading);

    useEffect(() => {
      if(symbol !== "") {
        const unsubscribeToTickers = db.collection("tickers")        
          .where("symbol", "==", symbol)
          .withConverter(tickerConverter)
          .onSnapshot((snap: firebase.firestore.QuerySnapshot) => { 
            try {
              if(snap.docs.length === 1) {
                let tickers: ITicker[] = [];

                snap.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => 
                  tickers.push(doc.data() as ITicker));
      
                setTicker(tickers[0]);
      
                if(status !== RequestStatus.Success) {
                  setStatus(RequestStatus.Success);
                }
              } else {
                throw new Error(`Incorrect result size. Expected: [1]. Actual: [${snap.docs.length}]`)
              }
            } catch (err) {
              console.error("useTickerEffect:", err.message);
                  
              setStatus(RequestStatus.Error);
            }
          }, (err: firebase.firestore.FirestoreError) => {
            console.error("useTickerEffect:", err.message);
            
            setStatus(RequestStatus.Error);
          });
            
        return () => {
          unsubscribeToTickers();
        }
      }
    }, [symbol]);

  return { ticker, status };
}