import React, { useContext } from "react";

import { Modal } from "../modal/modal";
import { ModalBody } from "../modal/modalBody";
import { ModalTitle } from "../../components/modal/modalTitle";
import { Settings } from "../settings/settings";

import { AppContext } from "../app/contexts/appContext";

import { useOnClickAwayEffect } from "../../effects/appEffects";

import { AppAction } from "../../enums/appAction";

interface SettingsModalProps {  
  
}

export const SettingsModal: React.FC<SettingsModalProps> = (props: SettingsModalProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });
  
  const { statuses, toggles } = appState;

  useOnClickAwayEffect(
    toggles.settings, 
    ["tickerr-user-settings-modal-content"], 
    [toggles.settings], 
    () => dispatch(AppAction.ToggleSettings, false)
  );

  if(toggles.settings) {
    return (
      <Modal id="tickerr-user-settings-modal" priority status={statuses.settings}>
        <ModalTitle text="Settings" handleOnClose={() => dispatch(AppAction.ToggleSettings, false)} />
        <ModalBody>
          <Settings />
        </ModalBody>
      </Modal>
    );
  }

  return null;
}