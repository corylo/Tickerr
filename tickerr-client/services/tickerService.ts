import axios from "axios";
import _sortBy from "lodash.sortby";

import { TickerUtility } from "../utilities/tickerUtility";

import { ITicker } from "../../tickerr-models/ticker";
import { ITickerChartPoint } from "../../tickerr-models/tickerChartPoint";

import { Currency } from "../enums/currency";

interface ITickerService {
  fetchChart: (symbol: string, currency: Currency) => Promise<ITickerChartPoint[]>;
  fetchTicker: (symbol: string, currency: Currency) => Promise<ITicker>;
  fetchTickers: (currency: Currency, limit?: number) => Promise<ITicker[]>;
}

export const TickerService: ITickerService = {
  fetchChart: async (symbol: string, currency: Currency): Promise<ITickerChartPoint[]> => {
    const geckoID: string = TickerUtility.getGeckoIDFromSymbol(symbol),
      res: any = await axios.get(TickerUtility.getGeckoChartUrl(geckoID, currency));
    
    return TickerUtility.mapTickerChart(res.data);
  },
  fetchTicker: async (symbol: string, currency: Currency): Promise<ITicker> => {
    const geckoID: string = TickerUtility.getGeckoIDFromSymbol(symbol),
      res: any = await axios.get(TickerUtility.getGeckoTickerUrl(geckoID, currency));
    
    if(res.data && res.data.length === 1) {
      return TickerUtility.mapTicker(res.data[0]);
    }

    throw new Error(`Unexpected data returned for ticker: ${symbol}`);
  },
  fetchTickers: async (currency: Currency, limit?: number): Promise<ITicker[]> => {
    const res: any = await axios.get(TickerUtility.getGeckoTickersUrl(currency, limit));
    
    return _sortBy(TickerUtility.mapTickers(res.data), "rank");
  }
}