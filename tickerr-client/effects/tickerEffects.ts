import { useEffect, useState } from "react";
import _sortBy from "lodash.sortby";

import { TickerService } from "../services/tickerService";

import { IAppState } from "../components/app/models/appState";
import { ITicker } from "../../tickerr-models/ticker";

import { AppStatus } from "../components/app/enums/appStatus";
import { Currency } from "../enums/currency";
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

interface IUseTickersEffect {
  tickers: ITicker[];
  status: RequestStatus;
}

export const useTickersEffect = (appState: IAppState, limit: number): IUseTickersEffect => {
  const [tickers, setTickers] = useState<ITicker[]>([]),
    [status, setStatus] = useState<RequestStatus>(RequestStatus.Loading);

    useEffect(() => {
      if(appState.status === AppStatus.SignedIn) {
        const fetch = async () => {
          try {
            const tickers: ITicker[] = await TickerService.fetchTickers(appState.settings.currency, limit);
            
            setTickers(tickers);

            setStatus(RequestStatus.Success);
          } catch (err) {
            console.error(err);

            setStatus(RequestStatus.Error);
          }
        }

        fetch();

        const interval: NodeJS.Timeout = setInterval(() => fetch(), 30000);

        return () => {
          clearInterval(interval);
        }
      }
    }, [appState.status]);
    
  return { tickers, status };
}

export const useTickerEffect = (symbol: string, currency: Currency, dispatch: (type: TickerStateAction, payload?: any) => void): void => {  
  useEffect(() => {
    if(symbol !== "") {
      const fetch = async () => {
        try {
          const ticker: ITicker = await TickerService.fetchTicker(symbol, currency);

          ticker.chart = await TickerService.fetchChart(symbol, currency);

          dispatch(TickerStateAction.SetTicker, ticker);
        } catch (err) {
          console.error(err);

          dispatch(TickerStateAction.SetStatus, { errorMessage: "Whoops! This ticker does not exist yet. Please check back again soon." });
        }
      }

      fetch();

      const interval: NodeJS.Timeout = setInterval(() => fetch(), 30000);

      return () => {
        clearInterval(interval);
      }
    }
  }, [symbol]);
}