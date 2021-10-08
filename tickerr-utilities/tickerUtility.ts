import { StringUtility } from "../tickerr-client/utilities/stringUtility";

import { IGeckoTicker } from "../tickerr-models/geckoTicker";
import { IGeckoTickerChartPoint } from "../tickerr-models/geckoTickerChartPoint";
import { defaultTicker, ITicker } from "../tickerr-models/ticker";
import { ITickerChartPoint } from "../tickerr-models/tickerChartPoint";

import { ApiURL } from "../tickerr-client/enums/apiURL";
import { Currency } from "../tickerr-enums/currency";

interface ITickerUtility {
  filterSearchResults: (query: string, tickers: ITicker[], limit?: number) => ITicker[];
  getGeckoChartUrl: (geckoID: string, currency: Currency) => string;
  getGeckoTickerUrl: (geckoID: string, currency: Currency) => string;    
  getGeckoTickersUrl: (currency: Currency, limit?: number, page?: number) => string;   
  getTickerBySymbol: (symbol: string, tickers: ITicker[]) => ITicker;
  mapTicker: (geckoTicker: IGeckoTicker) => ITicker;
  mapTickerPlaceholder: (query: string) => ITicker;
  mapTickers: (geckoTickers: IGeckoTicker[]) => ITicker[];
  mapTickerChart: (points: IGeckoTickerChartPoint) => ITickerChartPoint[];
}

export const TickerUtility: ITickerUtility = {
  filterSearchResults: (query: string, tickers: ITicker[], limit?: number): ITicker[] => {
    query = StringUtility.format(query);

    return tickers.filter((ticker: ITicker) => (
        StringUtility.format(ticker.symbol).indexOf(query) >= 0 ||
        StringUtility.format(ticker.name).indexOf(query) >= 0
      ))
      .slice(0, limit || 10);
  },
  getGeckoChartUrl: (geckoID: string, currency: Currency): string => {
    return `${ApiURL.Gecko}/coins/${geckoID}/market_chart?vs_currency=${currency}&days=1`;
  },
  getGeckoTickerUrl: (geckoID: string, currency: Currency): string => {
    return `${ApiURL.Gecko}/coins/markets?vs_currency=${currency}&ids=${geckoID}&per_page=1&sparkline=false`;
  },
  getGeckoTickersUrl: (currency: Currency, limit?: number, page?: number): string => {   
    return `${ApiURL.Gecko}/coins/markets?vs_currency=${currency}&page=${page || 1}&per_page=${limit || 100}&sparkline=false`;
  },
  getTickerBySymbol: (symbol: string, tickers: ITicker[]): ITicker => {
    const ticker: ITicker = tickers.find((ticker: ITicker) => ticker.symbol === symbol);

    return ticker || null;
  },
  mapTicker: (geckoTicker: IGeckoTicker): ITicker => {
    return {
      change: {
        day: geckoTicker.price_change_percentage_24h
      },
      chart: [],
      cap: geckoTicker.market_cap,
      geckoID: geckoTicker.id,
      id: geckoTicker.id,      
      icon: geckoTicker.image,
      name: geckoTicker.name,
      price: geckoTicker.current_price,      
      rank: geckoTicker.market_cap_rank,
      supply: geckoTicker.circulating_supply,
      symbol: geckoTicker.symbol.toLowerCase(),      
      volume: geckoTicker.total_volume
    }
  },
  mapTickerPlaceholder: (query: string): ITicker => {
    return {
      ...defaultTicker(),
      symbol: query
    }
  },
  mapTickers: (geckoTickers: IGeckoTicker[]): ITicker[] => {    
    return geckoTickers.map((geckoTicker: IGeckoTicker) => TickerUtility.mapTicker(geckoTicker))
  },
  mapTickerChart: (chart: IGeckoTickerChartPoint): ITickerChartPoint[] => {
    return chart.prices.map((price: number[]) => ({
      price: price[1],
      timestamp: price[0]
    }));
  }
}