import { StringUtility } from "./stringUtility";

import { IGeckoTicker } from "../../tickerr-models/geckoTicker";
import { IGeckoTickerChartPoint } from "../../tickerr-models/geckoTickerChartPoint";
import { ITicker } from "../../tickerr-models/ticker";
import { ITickerChartPoint } from "../../tickerr-models/tickerChartPoint";
import { ITickerIcon } from "../../tickerr-models/tickerIcon";

import { Currency } from "../../tickerr-enums/currency";

import { geckoCoinSymbolMap, IGeckoCoinSymbolMapItem } from "../constants/gecko";
import { URL } from "../enums/url";

interface ITickerUtility {
  filterSearchResults: (query: string, limit?: number) => IGeckoCoinSymbolMapItem[];
  getDefaultSearchResults: () => IGeckoCoinSymbolMapItem[];
  getGeckoIDFromSymbol: (symbol: string) => string;
  getGeckoChartUrl: (geckoID: string, currency: Currency) => string;
  getGeckoTickerUrl: (geckoID: string, currency: Currency) => string;    
  getGeckoTickersUrl: (currency: Currency, limit?: number) => string;    
  getIcon: (symbol: string, tracked: boolean) => ITickerIcon;
  isTracked: (geckoTicker: IGeckoTicker) => boolean;
  mapTicker: (geckoTicker: IGeckoTicker) => ITicker;
  mapTickers: (geckoTickers: IGeckoTicker[]) => ITicker[];
  mapTickerChart: (points: IGeckoTickerChartPoint) => ITickerChartPoint[];
}

export const TickerUtility: ITickerUtility = {
  filterSearchResults: (query: string, limit?: number): IGeckoCoinSymbolMapItem[] => {
    query = StringUtility.format(query);

    return geckoCoinSymbolMap.filter((coin: IGeckoCoinSymbolMapItem) => coin.tracked)
      .filter((coin: IGeckoCoinSymbolMapItem) => (
        StringUtility.format(coin.symbol).indexOf(query) >= 0 ||
        StringUtility.format(coin.name).indexOf(query) >= 0
      ))
      .slice(0, limit || 10);
  },
  getDefaultSearchResults: (): IGeckoCoinSymbolMapItem[] => {
    return geckoCoinSymbolMap.slice(0, 5);
  },
  getGeckoIDFromSymbol: (symbol: string): string => {
    const item: IGeckoCoinSymbolMapItem = geckoCoinSymbolMap.find((item: IGeckoCoinSymbolMapItem) => item.symbol === symbol);

    return item ? item.geckoID : "";
  },
  getGeckoChartUrl: (geckoID: string, currency: Currency): string => {
    return `${URL.Gecko}/coins/${geckoID}/market_chart?vs_currency=${currency}&days=1`;
  },
  getGeckoTickerUrl: (geckoID: string, currency: Currency): string => {
    return `${URL.Gecko}/coins/markets?vs_currency=${currency}&ids=${geckoID}&per_page=1&sparkline=false`;
  },
  getGeckoTickersUrl: (currency: Currency, limit?: number): string => {   
    return `${URL.Gecko}/coins/markets?vs_currency=${currency}&per_page=${limit || 100}&sparkline=false`;
  },
  getIcon: (symbol: string, tracked: boolean): ITickerIcon => {
    if(tracked) {
      return {
        color: `/img/icons/color/${symbol.toLowerCase()}.svg`,
        white: `/img/icons/white/${symbol.toLowerCase()}.svg`
      }
    }

    return {
      color: "/img/icons/color/untracked.svg",
      white: "/img/icons/white/untracked.svg"
    }
  },
  isTracked: (geckoTicker: IGeckoTicker): boolean => {
    const item: IGeckoCoinSymbolMapItem = geckoCoinSymbolMap.find((item: IGeckoCoinSymbolMapItem) => item.symbol === geckoTicker.symbol);

    return item && item.tracked || false;
  },
  mapTicker: (geckoTicker: IGeckoTicker): ITicker => {
    const tracked: boolean = TickerUtility.isTracked(geckoTicker);

    return {
      change: {
        day: geckoTicker.price_change_percentage_24h
      },
      chart: [],
      cap: geckoTicker.market_cap,
      geckoID: geckoTicker.id,
      id: geckoTicker.id,
      icon: TickerUtility.getIcon(geckoTicker.symbol, tracked),
      name: geckoTicker.name,
      price: geckoTicker.current_price,      
      rank: geckoTicker.market_cap_rank,
      supply: geckoTicker.circulating_supply,
      symbol: geckoTicker.symbol,
      tracked,
      volume: geckoTicker.total_volume
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