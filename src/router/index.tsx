import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Root, Login, NotFound } from "../pages";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route exact path="/login" component={Login} />
      <NotFound />
    </Switch>
  </BrowserRouter>
);

export default App;
