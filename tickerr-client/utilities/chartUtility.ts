import Chart from "chart.js";

import { ITickerChartPoint } from "../../tickerr-models/tickerChartPoint";

import { Color } from "../enums/colors";

interface IChartUtility {
  draw: (id: string, points: ITickerChartPoint[], change: number) => void;
  getMin: (points: ITickerChartPoint[]) => number;
  getMax: (points: ITickerChartPoint[]) => number;
}

export const ChartUtility: IChartUtility = {
  draw: (id: string, points: ITickerChartPoint[], change: number): void => {
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

      new Chart(context, {
        type: "line",
        data: {
          datasets: [{
            data: points.map((point: ITickerChartPoint) => point.price),
            borderColor: `rgba(${color}, 0.5)`,
            fill: `rgba(${color}, 0.5)`,            
            pointRadius: 0
          }],
          labels: points.map((point: ITickerChartPoint) => point.timestamp)
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [{
              display: false,
              gridLines: {
                display:false
              }
            }],
            yAxes: [{
              display: false,
              gridLines: {
                display:false
              },
              ticks: {
                suggestedMin: min * 0.98,
                suggestedMax: max * 1.02
              }
            }]
          },
          legend: {
            display: false
          },
          title: {
            display: false
          }
        }
      })
    }
  },
  getMin: (points: ITickerChartPoint[]): number => {
    return Math.min.apply(Math, points.map((point: ITickerChartPoint) => point.price));
  },
  getMax: (points: ITickerChartPoint[]): number => {
    return Math.max.apply(Math, points.map((point: ITickerChartPoint) => point.price));
  }
}