import React, { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router";

import { HomePage } from "../../pages/homePage/homePage";
import { CookiesPage } from "../../pages/legalPage/cookiesPage";
import { LegalPage } from "../../pages/legalPage/legalPage";
import { PrivacyPage } from "../../pages/legalPage/privacyPage";
import { TermsPage } from "../../pages/legalPage/termsPage";
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
  )
}