import React, { useContext } from "react";

import { Modal } from "../modal/modal";
import { ModalBody } from "../modal/modalBody";
import { ModalTitle } from "../../components/modal/modalTitle";
import { Settings } from "../settings/settings";

import { AppContext } from "../app/contexts/appContext";

import { AppAction } from "../../enums/appAction";

interface SettingsModalProps {  
  
}

export const SettingsModal: React.FC<SettingsModalProps> = (props: SettingsModalProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });
  
  const { statuses, toggles } = appState;

  if(toggles.settings) {
    const handleOnClose = (): void => dispatch(AppAction.ToggleSettings, false);

    return (
      <Modal id="tickerr-user-settings-modal" priority status={statuses.settings} handleOnClose={handleOnClose}>
        <ModalTitle text="Settings" handleOnClose={handleOnClose} />
        <ModalBody>
          <Settings />
        </ModalBody>
      </Modal>
    );
  }

  return null;
}