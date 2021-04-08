import React, { useContext, useEffect, useState } from "react";

import { IconButton } from "../buttons/iconButton";

import { AppContext } from "../app/contexts/appContext";

import { AppStatus } from "../app/enums/appStatus";

interface CookieAlertProps { 
  
}

export const CookieAlert: React.FC<CookieAlertProps> = (props: CookieAlertProps) => {  
  const { appState } = useContext(AppContext);

  const hasAccepted = (): boolean => localStorage.getItem("accepted-cookie-use") !== null;

  const [accepted, accept] = useState<boolean>(hasAccepted());

  useEffect(() => {
    const handleOnScroll = (e: any) => {
      if(!accepted) {
        accept(true);
      }
    }

    window.addEventListener("scroll", handleOnScroll);

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    }
  }, [accepted]);

  if(appState.status === AppStatus.SignedOut && !accepted) {
    const handleOnClick = () => {
      localStorage.setItem("accepted-cookie-use", "true");

      accept(true);
    }

    return (
      <div id="tickerr-cookie-alert">
        <h1 className="passion-one-font">We use 🍪. <a href="https://legal.tickerr.tv/cookies" target="_blank">Learn more.</a></h1>
        <IconButton icon="fas fa-times" handleOnClick={handleOnClick} />
      </div>
    );
  }

  return null;
}