import React from "react";
import { Route, Switch } from "react-router";

import { HomePage } from "../../pages/homePage/homePage";
import { TickerPage } from "../../pages/tickerPage/tickerPage";

import { Navbar } from "../navbar/navbar";

interface AppProps {}

export const App: React.FC<AppProps> = (props: AppProps) => {
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
      </Switch>
    </div>
  )
}