import { useEffect, useState } from "react";
import firebase from "firebase/app";
import _sortBy from "lodash.sortby";

import { db } from "../firebase";

import { ITicker, tickerConverter } from "../../tickerr-models/ticker";
import { ITickerSummary, tickerSummaryConverter } from "../../tickerr-models/tickerSummary";

import { RequestStatus } from "../enums/requestStatus";
import { TickerStateAction } from "../pages/tickerPage/enums/tickerStateAction";

export const useUpdateUrlSymbolEffect = (match: any, dispatch: (type: TickerStateAction, payload?: any) => void): void => {
  useEffect(() => {
    if(
      match && 
      match.params && 
      match.params.symbol && 
      match.params.symbol.length > 1 && 
      match.params.symbol.length < 20
    ) {      
      dispatch(TickerStateAction.SetUrlSymbol, match.params.symbol);
    }
  }, []);
}

interface IUseTickerSummaryEffect {
  summary: ITickerSummary;
  status: RequestStatus;
}

export const useTickerSummaryEffect = (): IUseTickerSummaryEffect => {
  const [summary, setSummary] = useState<ITickerSummary>(null),
    [status, setStatus] = useState<RequestStatus>(RequestStatus.Loading);

    useEffect(() => {
      const unsubscribeToTickers = db.collection("summary")   
        .doc("crypto")
        .withConverter(tickerSummaryConverter)
        .onSnapshot((doc: firebase.firestore.QueryDocumentSnapshot) => { 
          try {
            const data: ITickerSummary = doc.data() as ITickerSummary;

            data.top = _sortBy(data.top, "cap").reverse();
            
            setSummary(data);
  
            if(status !== RequestStatus.Success) {
              setStatus(RequestStatus.Success);
            }
          } catch (err) {
            console.error("useTickerSummaryEffect:", err.message);
                
            setStatus(RequestStatus.Error);
          }
        }, (err: firebase.firestore.FirestoreError) => {
          console.error("useTickerSummaryEffect:", err.message);
          
          setStatus(RequestStatus.Error);
        });
          
        return () => {
          unsubscribeToTickers();
        }
    }, []);
    
  return { summary, status };
}

export const useTickerEffect = (symbol: string, dispatch: (type: TickerStateAction, payload?: any) => void): void => {  
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
    
              dispatch(TickerStateAction.SetTicker, tickers[0]);
            } else {
              throw new Error(`Incorrect result size. Expected: [1]. Actual: [${snap.docs.length}]`)
            }
          } catch (err) {
            console.error("useTickerEffect:", err.message);

            dispatch(TickerStateAction.SetStatus, { errorMessage: "Whoops! This ticker does not exist yet. Please check back again soon." });
          }
        }, (err: firebase.firestore.FirestoreError) => {
          console.error("useTickerEffect:", err.message);

          dispatch(TickerStateAction.SetStatus, RequestStatus.Error);
        });
          
      return () => {
        unsubscribeToTickers();
      }
    }
  }, [symbol]);
}