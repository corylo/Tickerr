import React, { useContext } from "react";

import { Button } from "../buttons/button";

import { AppContext } from "../app/contexts/appContext";

import { AppAction } from "../../enums/appAction";

interface TermlyPreferencesButtonProps {
  
}

export const TermlyPreferencesButton: React.FC<TermlyPreferencesButtonProps> = (
  props: TermlyPreferencesButtonProps
) => {
  const { appState, dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });

  const handleOnClick = (): void => {
    { //@ts-ignore
      window.displayPreferenceModal();
    }

    dispatch(AppAction.ToggleMenu, false);
  }

  return (
    <Button className="termly-cookie-preference-button passion-one-font" handleOnClick={handleOnClick}>      
      Cookies
    </Button>    
  )
};
