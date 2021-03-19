import React, { useReducer } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router";

import { HomePage } from "../../pages/homePage/homePage";
import { CookiesPage } from "../../pages/legalPage/cookiesPage";
import { LegalPage } from "../../pages/legalPage/legalPage";
import { PrivacyPage } from "../../pages/legalPage/privacyPage";
import { TermsPage } from "../../pages/legalPage/termsPage";
import { TickerPage } from "../../pages/tickerPage/tickerPage";

import { Navbar } from "../navbar/navbar";
import { SettingsModal } from "../settingsModal/settingsModal";

import { AppContext } from "./contexts/appContext";

import { appReducer } from "./reducers/appReducer";

import { useFetchAppSettingsEffect } from "./effects/appEffects";
import { useScrollToTopEffect, useUpdatePageOGUrlEffect } from "../../effects/appEffects";

import { defaultAppState } from "./models/appState";

import { AppAction } from "./enums/appAction";

interface AppProps {}

export const App: React.FC<AppProps> = (props: AppProps) => {
  const [appState, dispatchToApp] = useReducer(appReducer, defaultAppState());

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });

  const location: any = useLocation();

  useScrollToTopEffect(location);

  useUpdatePageOGUrlEffect(location);

  useFetchAppSettingsEffect(dispatch);
  
  return (
    <AppContext.Provider value={{ appState, dispatchToApp }}>
      <div id="tickerr-app">
        <Navbar />
        <SettingsModal />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/legal">
            <LegalPage />
          </Route>
          <Route exact path="/legal/privacy">
            <PrivacyPage />
          </Route>
          <Route exact path="/legal/terms">
            <TermsPage />
          </Route>
          <Route exact path="/legal/cookies">
            <CookiesPage />
          </Route>
          <Route exact path="/:symbol">
            <TickerPage />
          </Route>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </AppContext.Provider>
  )
}