import { IGeckoTicker } from "../../tickerr-models/geckoTicker";
import { ITicker } from "../../tickerr-models/ticker";

interface ITickerUtility {
  findGeckoTicker: (ticker: ITicker, geckoTickers: IGeckoTicker[]) => IGeckoTicker;
  getGeckoUrl: (tickers: ITicker[]) => string;
  mapTickersFromCollection: (snap: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => ITicker[];
  mapTicker: (ticker: ITicker, geckoTicker: IGeckoTicker) => ITicker;
  updateTickers: (tickers: ITicker[], geckoTickers: IGeckoTicker[]) => ITicker[];
}

export const TickerUtility: ITickerUtility = {
  findGeckoTicker: (ticker: ITicker, geckoTickers: IGeckoTicker[]): IGeckoTicker => {
    return geckoTickers.find((geckoTicker: IGeckoTicker) => geckoTicker.id === ticker.geckoID);
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
      name: geckoTicker.name,
      price: geckoTicker.current_price,      
      supply: geckoTicker.circulating_supply,
      symbol: geckoTicker.symbol,
      volume: geckoTicker.total_volume
    }
  },
  mapTickersFromCollection: (snap: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>): ITicker[] => {
    const tickers: ITicker[] = [];

    snap.forEach((doc: FirebaseFirestore.DocumentData) =>  tickers.push({ id: doc.id, ...doc.data() }));

    return tickers;
  },
  updateTickers: (tickers: ITicker[], geckoTickers: IGeckoTicker[]): ITicker[] => {
    return tickers.map((ticker: ITicker) => 
      TickerUtility.mapTicker(ticker, TickerUtility.findGeckoTicker(ticker, geckoTickers)))
  }
}