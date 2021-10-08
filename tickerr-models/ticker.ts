import { ITickerChange } from "./tickerChange";
import { ITickerChartPoint } from "./tickerChartPoint";

export interface ITicker {
  id: string;
  cap: number; 
  change: ITickerChange;
  chart: ITickerChartPoint[];
  geckoID: string;
  icon: string;
  name: string;
  price: number;
  rank: number;
  supply: number;
  symbol: string;
  volume: number;
}

export const defaultTicker = (): ITicker => ({
  id: "",
  cap: 0,
  change: {
    day: 0    
  },
  chart: [],
  geckoID: "",
  icon: "",
  name: "",
  price: 0,
  rank: 0,
  supply: 0,
  symbol: "",
  volume: 0
})