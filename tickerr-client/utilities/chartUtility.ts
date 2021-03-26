import Chart from "chart.js";

import { ChartOptionsUtility } from "./chartOptionsUtility";

import { ITickerChartPoint } from "../../tickerr-models/tickerChartPoint";

import { Color } from "../../tickerr-enums/colors";

interface IChartUtility {
  draw: (id: string, points: ITickerChartPoint[], change: number) => Chart;
  getMin: (points: ITickerChartPoint[]) => number;
  getMax: (points: ITickerChartPoint[]) => number;
  getPrices: (points: ITickerChartPoint[]) => number[];
  getTimestamps: (points: ITickerChartPoint[]) => number[];
  update: (chart: Chart, points: ITickerChartPoint[], change: number) => void;
}

export const ChartUtility: IChartUtility = {
  draw: (id: string, points: ITickerChartPoint[], change: number): Chart => {
    const canvas: HTMLCanvasElement | null = document.getElementById(id) as HTMLCanvasElement | null;

    if(canvas !== null) {
      const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

      const width: number = context.canvas.clientWidth,
        height: number = context.canvas.clientHeight,
        color: Color = change >= 0 ? Color.Green : Color.Red,
        min: number = ChartUtility.getMin(points),
        max: number = ChartUtility.getMax(points);

      context.canvas.width = width;
      context.canvas.height = height;

      context.stroke();

      return new Chart(context, {
        type: "line",
        data: {
          datasets: [{
            data: ChartUtility.getPrices(points),
            ...ChartOptionsUtility.getDatasetOptions(color)
          }],
          labels: ChartUtility.getTimestamps(points)
        },
        options: ChartOptionsUtility.getOptions(min, max)
      });
    }
  },
  getMin: (points: ITickerChartPoint[]): number => {
    return Math.min.apply(Math, points.map((point: ITickerChartPoint) => point.price));
  },
  getMax: (points: ITickerChartPoint[]): number => {
    return Math.max.apply(Math, points.map((point: ITickerChartPoint) => point.price));
  },
  getPrices: (points: ITickerChartPoint[]): number[] => {
    return points.map((point: ITickerChartPoint) => point.price);
  },
  getTimestamps: (points: ITickerChartPoint[]): number[] => {
    return points.map((point: ITickerChartPoint) => point.timestamp);
  },
  update: (chart: Chart, points: ITickerChartPoint[], change: number): void => {
    const color: Color = change >= 0 ? Color.Green : Color.Red;
    
    const options: Chart.ChartDataSets = ChartOptionsUtility.getDatasetOptions(color);

    chart.data.datasets[0].data = ChartUtility.getPrices(points);
    chart.data.datasets[0].backgroundColor = options.backgroundColor;
    chart.data.datasets[0].borderColor = options.borderColor;    
    chart.data.datasets[0].pointRadius = options.pointRadius;

    chart.data.labels = ChartUtility.getTimestamps(points);

    chart.update();
  }
}