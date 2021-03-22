import React, { useContext } from "react";
import firebase from "firebase/app";

import { auth } from "../../firebase";

import { Button } from "../buttons/button";
import { Modal } from "../modal/modal";
import { ModalBody } from "../modal/modalBody";
import { ModalTitle } from "../../components/modal/modalTitle";

import { AppContext } from "../app/contexts/appContext";

import { AppAction } from "../../enums/appAction";

interface SignInModalProps {  
  
}

export const SignInModal: React.FC<SignInModalProps> = (props: SignInModalProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });
  
  if(appState.toggles.signIn) {
    const handleSignInWithGoogle = async () => {
      const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
  
      provider.setCustomParameters({ prompt: "select_account" });
  
      auth.signInWithRedirect(provider);
    }
  
    return (
      <Modal id="tickerr-sign-in-modal" priority>
        <ModalTitle text="Sign In" handleOnClose={() => dispatch(AppAction.ToggleSignIn, false)} />
        <ModalBody>
          <Button id="tickerr-google-sign-in-button" handleOnClick={handleSignInWithGoogle}>
            <img src="/img/brands/google-logo.png" />
            <h1 className="passion-one-font">Sign In</h1>
          </Button>
        </ModalBody>
      </Modal>
    );
  }

  return null;
}