import { useEffect } from "react";
import _sortBy from "lodash.sortby";

import { TickerService } from "../services/tickerService";

import { IAppState } from "../components/app/models/appState";
import { ITicker } from "../../tickerr-models/ticker";

import { AppAction } from "../enums/appAction";
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
      dispatch(TickerStateAction.SwitchTicker, match.params.symbol);
    }
  }, [location.pathname]);
}

export const useFetchTickersOnIntervalEffect = (appState: IAppState, limit: number, dispatch: (type: AppAction, payload?: any) => void): void => {
  const { settings, statuses } = appState;
  
  useEffect(() => {    
    if(statuses.settings.is !== RequestStatus.Loading) {
      const fetch = async () => {
        try {
          const tickers: ITicker[] = await TickerService.fetchTickers(settings.currency, limit);

          dispatch(AppAction.FetchedTickers, tickers);
        } catch (err) {
          console.error(err);

          dispatch(AppAction.SetTickersStatus, { is: RequestStatus.Error, message: "" });
        }
      }

      fetch();

      const interval: NodeJS.Timeout = setInterval(() => fetch(), 30000);

      return () => {
        clearInterval(interval);
      }
    }
  }, [statuses.settings.is]);
}

export const useFetchTickerEffect = (symbol: string, appState: IAppState, status: RequestStatus, dispatch: (type: TickerStateAction, payload?: any) => void): void => {  
  const { settings, statuses } = appState;
  
  useEffect(() => {
    if(status !== RequestStatus.Loading) {
      dispatch(TickerStateAction.SetStatus, RequestStatus.Loading);
    }
  }, [symbol]);

  useEffect(() => {
    if(
      symbol !== "" && 
      statuses.settings.is !== RequestStatus.Loading
    ) {
      const fetch = async () => {
        try {
          const geckoID: string = await TickerService.fetchGeckoID(symbol),
            ticker: ITicker = await TickerService.fetchTicker(geckoID, settings.currency);
          
          ticker.chart = await TickerService.fetchChart(geckoID, settings.currency);

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
  }, [symbol, statuses.settings.is]);
}