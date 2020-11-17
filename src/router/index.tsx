import React from "react";
import { Route, Switch } from "react-router";
import { Router } from "react-router-dom";
import { Root, Login, Chat, NotFound } from "../pages";
import history from "./history";

const App: React.FC = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/login" component={Login} />
      <NotFound />
    </Switch>
  </Router>
);

export default App;
