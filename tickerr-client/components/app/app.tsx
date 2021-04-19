import React, { useReducer } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router";

import { AccountPage } from "../../pages/accountPage/accountPage";
import { CyaPage } from "../../pages/cyaPage/cyaPage";
import { HomePage } from "../../pages/homePage/homePage";
import { TickerPage } from "../../pages/tickerPage/tickerPage";

import { CookieAlert } from "../cookieAlert/cookieAlert";
import { DonationModal } from "../donationModal/donationModal";
import { Navbar } from "../navbar/navbar";
import { SettingsModal } from "../settingsModal/settingsModal";
import { SignInModal } from "../signInModal/signInModal";
import { UserMenu } from "../userMenu/userMenu";

import { AppContext } from "./contexts/appContext";

import { appReducer } from "./reducers/appReducer";

import { useAuthStateChangedEffect, useFetchUserSettingsEffect } from "../../effects/userEffects";
import { useGlobalCommandsEffect, useScrollToTopEffect, useUpdatePageOGUrlEffect } from "../../effects/appEffects";

import { defaultAppState } from "./models/appState";

import { AppAction } from "../../enums/appAction";

interface AppProps {}

export const App: React.FC<AppProps> = (props: AppProps) => {
  const [appState, dispatchToApp] = useReducer(appReducer, defaultAppState());
  
  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });

  const location: any = useLocation();

  useScrollToTopEffect(location);

  useUpdatePageOGUrlEffect(location);

  useAuthStateChangedEffect(appState, dispatch);

  useFetchUserSettingsEffect(appState, dispatch);

  useGlobalCommandsEffect();

  return (
    <AppContext.Provider value={{ appState, dispatchToApp }}>
      <div id="tickerr-app">
        <Navbar />
        <SignInModal />
        <SettingsModal />
        <UserMenu />
        <CookieAlert />
        <DonationModal />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/account">
            <AccountPage />
          </Route>
          <Route exact path="/cya">
            <CyaPage />
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