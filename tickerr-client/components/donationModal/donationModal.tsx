import React, { useContext } from "react";

import { DonationInput } from "./components/donationInput";
import { Modal } from "../modal/modal";
import { ModalBody } from "../modal/modalBody";
import { ModalTitle } from "../modal/modalTitle";

import { AppContext } from "../app/contexts/appContext";

import { AppAction } from "../../enums/appAction";
import { Symbol } from "../../../tickerr-enums/symbol";

interface DonationModalProps {  
  
}

export const DonationModal: React.FC<DonationModalProps> = (props: DonationModalProps) => { 
  const { appState, dispatchToApp } = useContext(AppContext);
   
  const { toggles } = appState;

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });
  
  const handleOnClose = (): void => dispatch(AppAction.ToggleDonation, false);
  
  if(toggles.donation) {
    return (
      <Modal 
        id="tickerr-donation-modal" 
        priority 
        handleOnClose={handleOnClose}
      >
        <ModalTitle text="Support the cause!" handleOnClose={handleOnClose} />
        <ModalBody>
          <DonationInput label={Symbol.Btc} address="3Qv2aioBVe8hufdF1vToU8PunGuRYD2dRP" />
          <DonationInput label={Symbol.Eth} address="0xbEB77e72fc7e9D438549FADc1c0D3EE377CCee13" />
          <DonationInput label={Symbol.Ada} address="addr1v8ygpmek4lta93t2mejhkkx4636h90jkz36rsxwgzyr0rtgadxn5a" />
        </ModalBody>
      </Modal>
    );
  }

  return null;
}