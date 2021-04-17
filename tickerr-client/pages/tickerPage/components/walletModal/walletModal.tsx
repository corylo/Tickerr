import React, { useContext, useEffect, useReducer } from "react";

import { Button } from "../../../../components/buttons/button";
import { Form } from "../../../../components/form/form";
import { FormActions } from "../../../../components/form/formActions";
import { FormBody } from "../../../../components/form/formBody";
import { InputWrapper } from "../../../../components/inputWrapper/inputWrapper";
import { Modal } from "../../../../components/modal/modal";
import { ModalTitle } from "../../../../components/modal/modalTitle";
import { ModalBody } from "../../../../components/modal/modalBody";

import { AppContext } from "../../../../components/app/contexts/appContext";
import { TickerStateContext } from "../../contexts/tickerStateContext";

import { walletStateReducer } from "../../reducers/walletStateReducer";

import { UserService } from "../../../../services/userService";

import { UserUtility } from "../../../../utilities/userUtility";

import { WalletStateValidator } from "../../validators/walletStateValidator";

import { useOnClickAwayEffect } from "../../../../effects/appEffects";
import { useSetWalletEffect } from "../../effects/walletEffects";

import { IWallet } from "../../../../../tickerr-models/wallet";
import { defaultWalletState } from "../../models/walletState";

import { AppAction } from "../../../../enums/appAction";
import { FormStatus } from "../../../../enums/formStatus";
import { TickerStateAction } from "../../enums/tickerStateAction";
import { WalletStateAction } from "../../enums/walletStateAction";

interface WalletModalProps {  
  
}

export const WalletModal: React.FC<WalletModalProps> = (props: WalletModalProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext), 
    { tickerState, dispatchToTickerState } = useContext(TickerStateContext);

  const { user } = appState;

  const { ticker, toggles } = tickerState;

  const [walletState, dispatchToWalletState] = useReducer(walletStateReducer, defaultWalletState());

  const dispatch = (type: WalletStateAction, payload?: any): void => dispatchToWalletState({ type, payload });
  
  useOnClickAwayEffect(
    toggles.wallet, 
    ["wallet-modal-content"], 
    [toggles.wallet, walletState.status], 
    () => dispatchToTickerState({ type: TickerStateAction.ToggleWallet, payload: false })
  );

  useSetWalletEffect(toggles, ticker, user, dispatch);

  useEffect(() => {
    if(walletState.status === FormStatus.SubmitSuccess) {
      dispatch(WalletStateAction.SetStatus, FormStatus.InProgress);
    }
  }, [walletState.wallet]);

  if(toggles.wallet) {
    const saveWallet = async () => {
      if(WalletStateValidator.validateWallet(user.wallets, walletState, dispatch)) {
        try {
          dispatch(WalletStateAction.SetStatus, FormStatus.Submitting);

          const updatedWallets: IWallet[] = UserUtility.mapUpdatedWallet(walletState.wallet, user.wallets);

          await UserService.update(user.uid, { wallets: updatedWallets });

          dispatchToApp({ type: AppAction.SetUserWallets, payload: updatedWallets });
  
          dispatch(WalletStateAction.SetStatus, FormStatus.SubmitSuccess);
        } catch (err) {
          console.error("submitGameEntry:", err.message);
  
          dispatch(WalletStateAction.SetStatus, FormStatus.SubmitError);
        }
      }
    }

    const handleOnKeyDown = (e: any): void => {
      if(e.key === "Enter") {
        saveWallet();
      }
    }
    
    return (
      <Modal id="wallet-modal" status={walletState.status}>
        <ModalTitle handleOnClose={() => dispatchToTickerState({ type: TickerStateAction.ToggleWallet, payload: false })}>
          <h1 className="passion-one-font">Add <span className="text-highlight">{walletState.wallet.symbol}</span> Wallet</h1>
        </ModalTitle>
        <ModalBody>
          <Form 
            errors={walletState.errors} 
            errorMessage="Whoops! Error updating wallet address. Please refresh and try again."
            status={walletState.status} 
            successMessage="Success! Wallet updated!"
          >
            <FormBody>
              <InputWrapper
                id="wallet-address-input" 
                label="Address" 
                value={walletState.wallet.address}
                error={walletState.errors.address}
              >
                <input 
                  type="text"
                  className="pt-sans-font"
                  placeholder="Enter address"
                  value={walletState.wallet.address}
                  onChange={(e: any) => dispatch(WalletStateAction.SetAddress, e.target.value)}
                  onKeyDown={handleOnKeyDown}
                />
              </InputWrapper>
            </FormBody>
            <FormActions>
              <Button
                id="save-wallet-address-button" 
                className="submit-button passion-one-font" 
                handleOnClick={saveWallet}
              >
                Save
              </Button>
            </FormActions>
          </Form>
        </ModalBody>
      </Modal>
    );
  }

  return null;
}