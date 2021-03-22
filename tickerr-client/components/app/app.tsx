import React, { useReducer } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router";

import { HomePage } from "../../pages/homePage/homePage";
import { TickerPage } from "../../pages/tickerPage/tickerPage";

import { Navbar } from "../navbar/navbar";
import { SettingsModal } from "../settingsModal/settingsModal";
import { SignInModal } from "../signInModal/signInModal";
import { UserMenu } from "../userMenu/userMenu";

import { AppContext } from "./contexts/appContext";

import { appReducer } from "./reducers/appReducer";

import { useAuthStateChangedEffect, useFetchUserSettingsEffect } from "./effects/appEffects";
import { useScrollToTopEffect, useUpdatePageOGUrlEffect } from "../../effects/appEffects";

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

  return (
    <AppContext.Provider value={{ appState, dispatchToApp }}>
      <div id="tickerr-app">
        <Navbar />
        <SignInModal />
        <SettingsModal />
        <UserMenu />
        <Switch>
          <Route exact path="/">
            <HomePage />
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