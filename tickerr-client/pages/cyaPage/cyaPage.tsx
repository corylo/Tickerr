import React, { useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router";

import { Page } from "../page/page";

import { PageMessage } from "../page/pageMessage";
import { PageMessageAction } from "../page/pageMessageAction";

import { AppContext } from "../../components/app/contexts/appContext";

import { useUpdatePageTitleEffect } from "../../effects/appEffects";
import { AppAction } from "../../enums/appAction";

interface CyaPageProps {
  
}

export const CyaPage: React.FC<CyaPageProps> = (props: CyaPageProps) => {
  const { appState, dispatchToApp } = useContext(AppContext);

  const { toggles } = appState;

  const history: any = useHistory();

  useUpdatePageTitleEffect("Tickerr | Cya!");

  useEffect(() => {
    return () => {
      dispatchToApp({ type: AppAction.ToggleCya, payload: false });
    }
  }, []);

  if(toggles.cya) {
    return(
      <Page id="tickerr-cya-page">   
        <PageMessage>
          <h1 id="tickerr-cya-page-title" className="passion-one-font">C'ya later!</h1>
          <h1 id="tickerr-cya-page-sub-title" className="passion-one-font">Your account has been successfully deleted. Come back any time.</h1>
          <PageMessageAction handleOnClick={() => history.push("/")}>
            Back to Home
          </PageMessageAction>
        </PageMessage> 
      </Page>
    );
  }

  return (
    <Redirect to="/" />
  );
}