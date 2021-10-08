import React, { useContext, useEffect, useState } from "react";

import { Button } from "../buttons/button";
import { Modal } from "../modal/modal";
import { ModalActions } from "../modal/modalActions";
import { ModalBody } from "../modal/modalBody";
import { ModalStatusMessage } from "../modal/modalStatusMessage";
import { ModalTitle } from "../modal/modalTitle";
import { Settings } from "../settings/settings";

import { AppContext } from "../app/contexts/appContext";

import { IUserSettings } from "../../../tickerr-models/userSettings";

import { AppAction } from "../../enums/appAction";
import { RequestStatus } from "../../enums/requestStatus";

interface SettingsModalProps {  
  
}

export const SettingsModal: React.FC<SettingsModalProps> = (props: SettingsModalProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const { settings, statuses, toggles } = appState;

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });
  
  const [unsavedSettings, setUnsavedSettings] = useState<IUserSettings>(settings);

  useEffect(() => setUnsavedSettings(settings), [settings]);

  useEffect(() => {
    if(statuses.settings.is !== RequestStatus.Loading && statuses.settings.is !== RequestStatus.Idle) {
      dispatch(AppAction.SetSettingsStatus, { is: RequestStatus.Idle, message: "" });
    }
  }, [unsavedSettings]);
  
  if(toggles.settings) {
    const handleOnClose = (): void => dispatch(AppAction.CloseSettings);
    
    const handleSave = async () => {
      try {
        dispatch(AppAction.SetSettingsStatus, { is: RequestStatus.Loading, message: "" });
        
        window.localStorage.setItem("settings", JSON.stringify(unsavedSettings));
        
        if(unsavedSettings.currency !== appState.settings.currency) {
          location.reload();
        } else {          
          dispatch(AppAction.UpdateSettings, unsavedSettings);
        }
      } catch (err) {
        console.error(err);
        
        dispatch(AppAction.SetSettingsStatus, { is: RequestStatus.Error, message: "Unable to save settings!" });
      }
    }

    return (
      <Modal 
        id="tickerr-user-settings-modal" 
        priority 
        status={statuses.settings.is} 
        handleOnClose={handleOnClose}
      >
        <ModalTitle text="Settings" handleOnClose={handleOnClose} />
        <ModalBody>
          <Settings unsavedSettings={unsavedSettings} setUnsavedSettings={setUnsavedSettings} />
        </ModalBody>
        <ModalStatusMessage status={statuses.settings.is} statusMessage={statuses.settings.message} />
        <ModalActions>
          <Button className="save-settings-button passion-one-font" handleOnClick={handleSave}>
            Save
          </Button>
        </ModalActions>
      </Modal>
    );
  }

  return null;
}