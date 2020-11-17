import React from "react";
import { Route, Switch } from "react-router";
import { Root, Chat, NotFound } from "../pages";
import Header from "../components/Header";

const Private = () => (
  <> 
    <Header />
    <Switch>
      <Route exact path="/" component={Root} />
      <Route exact path="/chat" component={Chat} />
      <Route path="*" component={NotFound} />
    </Switch>
  </>
);

export default Private;
