import { useEffect, useState } from "react";
import _sortBy from "lodash.sortby";

import { TickerService } from "../services/tickerService";

import { IAppState } from "../components/app/models/appState";
import { ITicker } from "../../tickerr-models/ticker";

import { AppStatus } from "../components/app/enums/appStatus";
import { Currency } from "../../tickerr-enums/currency";
import { TickerStateAction } from "../pages/tickerPage/enums/tickerStateAction";
import { RequestStatus } from "../enums/requestStatus";

export const useUpdateUrlSymbolEffect = (match: any, dispatch: (type: TickerStateAction, payload?: any) => void): void => {
  useEffect(() => {
    if(
      match && 
      match.params && 
      match.params.symbol && 
      match.params.symbol.length > 1 && 
      match.params.symbol.length < 20
    ) {      
      dispatch(TickerStateAction.SwitchTicker, match.params.symbol);
    }
  }, [location.pathname]);
}

interface IUseTickersEffect {
  tickers: ITicker[];
  status: RequestStatus;
}

export const useTickersEffect = (appState: IAppState, limit: number): IUseTickersEffect => {
  const [state, setState] = useState<IUseTickersEffect>({ tickers: [], status: RequestStatus.Loading });

  const { settings, statuses } = appState;
  
  useEffect(() => {    
    if(appState.status !== AppStatus.Loading && statuses.settings.is !== RequestStatus.Loading) {
      const fetch = async () => {
        try {
          const tickers: ITicker[] = await TickerService.fetchTickers(settings.currency, limit);
          
          setState({ tickers, status: RequestStatus.Success });
        } catch (err) {
          console.error(err);

          setState({ ...state, status: RequestStatus.Error });
        }
      }

      fetch();

      const interval: NodeJS.Timeout = setInterval(() => fetch(), 30000);

      return () => {
        clearInterval(interval);
      }
    }
  }, [appState.status, statuses.settings.is]);
    
  return state;
}

export const useTickerEffect = (symbol: string, appState: IAppState, status: RequestStatus, dispatch: (type: TickerStateAction, payload?: any) => void): void => {  
  const { settings, statuses } = appState;
  
  useEffect(() => {
    if(status !== RequestStatus.Loading) {
      dispatch(TickerStateAction.SetStatus, RequestStatus.Loading);
    }
  }, [symbol]);

  useEffect(() => {
    if(
      symbol !== "" && 
      appState.status !== AppStatus.Loading && 
      statuses.settings.is !== RequestStatus.Loading
    ) {
      const fetch = async () => {
        try {
          const ticker: ITicker = await TickerService.fetchTicker(symbol, settings.currency);
          
          ticker.chart = await TickerService.fetchChart(symbol, settings.currency);

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
  }, [symbol, appState.status, statuses.settings.is]);
}