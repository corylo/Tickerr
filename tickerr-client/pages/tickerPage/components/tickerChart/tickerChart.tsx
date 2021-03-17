import React, { useEffect } from "react";

import { ChartUtility } from "../../../../utilities/chartUtility";

import { ITicker } from "../../../../../tickerr-models/ticker";

interface TickerChartProps {
  ticker: ITicker;
}

export const TickerChart: React.FC<TickerChartProps> = (props: TickerChartProps) => {
  const id: string = "ticker-chart";

  useEffect(() => {
    ChartUtility.draw(id, props.ticker.chart, props.ticker.change.day);

    const handleResize = (): void => ChartUtility.draw(id, props.ticker.chart, props.ticker.change.day);

    window.addEventListener("resize", handleResize);

    return () => {      
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return(
    <canvas id={id}>
      
    </canvas>
  )
}