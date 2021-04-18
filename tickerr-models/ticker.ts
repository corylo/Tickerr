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