import React from "react";
import { Route, Switch } from "react-router";
import { Router } from "react-router-dom";
import { Login } from "../pages";
import history from "./history";
import Private from "./private";

const App: React.FC = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Private />
    </Switch>
  </Router>
);

export default App;
