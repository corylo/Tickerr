import React from "react";
import classNames from "classnames";

interface TickerSidePanelFieldProps {
  className?: string;
  value: string;
  label: string;
}

export const TickerSidePanelField: React.FC<TickerSidePanelFieldProps> = (props: TickerSidePanelFieldProps) => {  
  return(
    <div className={classNames("ticker-side-panel-field", props.className)}>      
      <h1 className="ticker-side-panel-field-value passion-one-font">{props.value}</h1>    
      <h1 className="ticker-side-panel-field-label passion-one-font">{props.label}</h1>      
    </div>
  )
}