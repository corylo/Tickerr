import React, { useContext } from "react";

import { Modal } from "../modal/modal";
import { ModalBody } from "../modal/modalBody";
import { ModalTitle } from "../../components/modal/modalTitle";
import { Settings } from "../settings/settings";

import { AppContext } from "../app/contexts/appContext";

import { AppAction } from "../app/enums/appAction";

interface SettingsModalProps {  
  
}

export const SettingsModal: React.FC<SettingsModalProps> = (props: SettingsModalProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });
  
  if(appState.toggles.settings) {
    return (
      <Modal id="drawars-user-menu-modal" whiteout priority>
        <ModalTitle text="Settings" handleOnClose={() => dispatch(AppAction.ToggleSettings, false)} />
        <ModalBody>
          <Settings />
        </ModalBody>
      </Modal>
    );
  }

  return null;
}