import React, { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router";

import { HomePage } from "../../pages/homePage/homePage";
import { PrivacyPage } from "../../pages/privacyPage/privacyPage";
import { TermsPage } from "../../pages/termsPage/termsPage";
import { TickerPage } from "../../pages/tickerPage/tickerPage";

import { Navbar } from "../navbar/navbar";

interface AppProps {}

export const App: React.FC<AppProps> = (props: AppProps) => {
  const location: any = useLocation();

  useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  
  return (
    <div id="tickerr-app">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/:symbol">
          <TickerPage />
        </Route>
        <Route exact path="/legal/privacy">
          <PrivacyPage />
        </Route>
        <Route exact path="/legal/terms">
          <TermsPage />
        </Route>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  )
}