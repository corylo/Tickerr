import { IGeckoTicker } from "../../tickerr-models/geckoTicker";
import { IGeckoTickerChartPoint } from "../../tickerr-models/geckoTickerChartPoint";
import { ITicker } from "../../tickerr-models/ticker";
import { ITickerChartPoint } from "../../tickerr-models/tickerChartPoint";

interface ITickerUtility {
  findGeckoTicker: (ticker: ITicker, geckoTickers: IGeckoTicker[]) => IGeckoTicker;
  getGeckoChartUrl: (id: string) => string;
  getGeckoUrl: (tickers: ITicker[]) => string;  
  mapTickersFromCollection: (snap: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => ITicker[];
  mapTicker: (ticker: ITicker, geckoTicker: IGeckoTicker) => ITicker;
  mapTickerChart: (points: IGeckoTickerChartPoint[]) => ITickerChartPoint[];
  updateTickers: (tickers: ITicker[], geckoTickers: IGeckoTicker[]) => ITicker[];
  removeCharts: (tickers: ITicker[]) => ITicker[];
}

export const TickerUtility: ITickerUtility = {
  findGeckoTicker: (ticker: ITicker, geckoTickers: IGeckoTicker[]): IGeckoTicker => {
    return geckoTickers.find((geckoTicker: IGeckoTicker) => geckoTicker.id === ticker.geckoID);
  },
  getGeckoChartUrl: (id: string): string => {
    return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`;
  },
  getGeckoUrl: (tickers: ITicker[]): string => {
    const ids: string = tickers.map((ticker: ITicker) => ticker.geckoID).join(",");

    return `https://api.coingecko.com/api/v3/coins/markets?ids=${ids}&vs_currency=usd&sparkline=false`;
  },
  mapTicker: (ticker: ITicker, geckoTicker: IGeckoTicker): ITicker => {
    return {
      ...ticker,
      cap: geckoTicker.market_cap,
      change: {
        day: geckoTicker.price_change_percentage_24h
      },
      icon: {
        color: `/img/icons/color/${geckoTicker.symbol.toLowerCase()}.svg`,
        white: `/img/icons/white/${geckoTicker.symbol.toLowerCase()}.svg`
      },
      name: geckoTicker.name,
      price: geckoTicker.current_price,      
      rank: geckoTicker.market_cap_rank,
      supply: geckoTicker.circulating_supply,
      symbol: geckoTicker.symbol,
      volume: geckoTicker.total_volume
    }
  },
  mapTickerChart: (points: IGeckoTickerChartPoint[]): ITickerChartPoint[] => {
    return points
      .filter((price: IGeckoTickerChartPoint, index: number) => index === 0 || index % 2 === 0 || index === points.length - 1)
      .map((price: IGeckoTickerChartPoint) => ({
        price: price[1],
        timestamp: price[0]
      }));
  },
  mapTickersFromCollection: (snap: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>): ITicker[] => {
    const tickers: ITicker[] = [];

    snap.forEach((doc: FirebaseFirestore.DocumentData) =>  tickers.push({ id: doc.id, ...doc.data() }));

    return tickers;
  },
  updateTickers: (tickers: ITicker[], geckoTickers: IGeckoTicker[]): ITicker[] => {
    return tickers.map((ticker: ITicker) => 
      TickerUtility.mapTicker(ticker, TickerUtility.findGeckoTicker(ticker, geckoTickers)))
  },
  removeCharts: (tickers: ITicker[]): ITicker[] => {
    return tickers.map((ticker: ITicker) => {
      ticker.chart = [];

      return ticker;
    });
  }
}