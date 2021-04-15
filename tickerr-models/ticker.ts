import { ITickerChange } from "./tickerChange";
import { ITickerChartPoint } from "./tickerChartPoint";
import { ITickerIcon } from "./tickerIcon";

export interface ITicker {
  id: string;
  cap: number; 
  change: ITickerChange;
  chart: ITickerChartPoint[];
  exists: boolean;
  geckoID: string;
  icon: ITickerIcon;
  name: string;
  price: number;
  rank: number;
  supply: number;
  symbol: string;
  tracked: boolean;
  volume: number;
}