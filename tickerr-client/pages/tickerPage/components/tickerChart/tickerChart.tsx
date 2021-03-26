import React, { useEffect, useState } from "react";

import { ChartUtility } from "../../../../utilities/chartUtility";

import { ITicker } from "../../../../../tickerr-models/ticker";

interface TickerChartProps {
  ticker: ITicker;
}

export const TickerChart: React.FC<TickerChartProps> = (props: TickerChartProps) => {
  const id: string = "ticker-chart";

  const [chart, setChart] = useState<Chart>(null)

  useEffect(() => {
    setChart(ChartUtility.draw(id, props.ticker.chart, props.ticker.change.day));
  }, []);

  useEffect(() => {
    if(chart) {
      const update = (): void => ChartUtility.update(chart, props.ticker.chart, props.ticker.change.day);

      update();

      window.addEventListener("resize", update);
  
      return () => {      
        window.removeEventListener("resize", update);
      }
    }
  }, [chart, props.ticker.chart]);

  return(
    <canvas id={id}/>
  )
}