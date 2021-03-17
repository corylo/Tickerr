import Chart from "chart.js";

import { Color } from "../enums/colors";

interface IChartOptionsUtility {
  getDatasetOptions: (color: Color) => Chart.ChartDataSets;
  getOptions: (min: number, max: number) => Chart.ChartOptions;
}

export const ChartOptionsUtility: IChartOptionsUtility = {
  getDatasetOptions: (color: Color): Chart.ChartDataSets => {
    return {
      borderColor: `rgba(${color}, 0.5)`,
      fill: `rgba(${color}, 0.5)`,            
      pointRadius: 0
    }
  },
  getOptions: (min: number, max: number): Chart.ChartOptions => {
    return {
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
  }
}