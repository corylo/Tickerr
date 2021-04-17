import React, { useContext } from "react";
import classNames from "classnames";

import { IconButton } from "../../../../components/buttons/iconButton";

import { AppContext } from "../../../../components/app/contexts/appContext";

import { SettingsUtility } from "../../../../utilities/settingsUtility";

interface TickerSidePanelFieldProps {
  className?: string;
  value: string;
  label: string;
  handleOnAction?: () => void;
}

export const TickerSidePanelField: React.FC<TickerSidePanelFieldProps> = (props: TickerSidePanelFieldProps) => {  
  const { appState } = useContext(AppContext);

  const getActionButton = (): JSX.Element => {
    if(props.handleOnAction) {
      return (
        <IconButton className="ticker-side-panel-field-action-button" icon="fas fa-pencil" handleOnClick={props.handleOnAction} />
      )
    }
  }

  return(
    <div className={classNames("ticker-side-panel-field", props.className)}>      
      <h1 className={classNames("ticker-side-panel-field-value", SettingsUtility.getFontClass(appState.settings.font))}>{props.value}</h1>    
      <h1 className={classNames("ticker-side-panel-field-label", SettingsUtility.getFontClass(appState.settings.font))}>{props.label}</h1>    
      {getActionButton()}  
    </div>
  )
}