import axios from "axios";

import { TickerUtility } from "../utilities/tickerUtility";

import { ITicker } from "../../tickerr-models/ticker";
import { ITickerChartPoint } from "../../tickerr-models/tickerChartPoint";

interface ITickerService {
  fetchChart: (ticker: ITicker) => Promise<ITickerChartPoint[]>;
  fetchCharts: (tickers: ITicker[]) => Promise<ITicker[]>;
}

export const TickerService: ITickerService = {
  fetchChart: async (ticker: ITicker): Promise<ITickerChartPoint[]> => {
    try {
      const res: any = await axios.get(TickerUtility.getGeckoChartUrl(ticker.geckoID));
      
      return TickerUtility.mapTickerChart(res.data.prices);
    } catch (err) {
      console.log(`Unable to fetch chart for ticker: ${ticker.name}`);
    }

    return ticker.chart;
  },
  fetchCharts: async (tickers: ITicker[]): Promise<ITicker[]> => {
    try {
      for(let ticker of tickers) {
        ticker.chart = await TickerService.fetchChart(ticker);
      }

      return tickers;
    } catch (err) {
      console.log("Unable to fetch charts");
    }

    return tickers;
  }
}