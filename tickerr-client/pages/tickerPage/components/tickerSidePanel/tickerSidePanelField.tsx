import React, { useContext } from "react";
import classNames from "classnames";

import { IconButton } from "../../../../components/buttons/iconButton";
import { TooltipSide } from "../../../../components/tooltip/tooltip";

import { AppContext } from "../../../../components/app/contexts/appContext";

import { SettingsUtility } from "../../../../utilities/settingsUtility";

interface TickerSidePanelFieldProps {
  actionIcon?: string;
  className?: string;  
  label: string;
  tooltip?: string;
  value: string;
  handleOnAction?: () => void;
}

export const TickerSidePanelField: React.FC<TickerSidePanelFieldProps> = (props: TickerSidePanelFieldProps) => {  
  const { appState } = useContext(AppContext);

  const getActionButton = (): JSX.Element => {
    if(props.handleOnAction) {
      return (
        <IconButton 
          className="ticker-side-panel-field-action-button" 
          icon={props.actionIcon || "fad fa-pencil"} 
          tooltip={props.tooltip}
          tooltipSide={TooltipSide.Left}
          handleOnClick={props.handleOnAction} 
        />
      )
    }
  }

  return(
    <div className={classNames("ticker-side-panel-field", SettingsUtility.getFontClass(appState.settings.font), props.className)}>            
      <h1 className="ticker-side-panel-field-value">{props.value}</h1>
      <h1 className="ticker-side-panel-field-label">{props.label}</h1>    
      {getActionButton()}  
    </div>
  )
}