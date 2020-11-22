import React from "react";
import styled from '@emotion/styled';
import { Route, Switch } from "react-router";
import { Root, Chat, NotFound, WriteFound } from "../pages";
import Header from "../components/Header";

const BodyContainer = styled.div`
  margin: 16px 450px;
`;

const Private = () => (
  <> 
    <Header />
    <BodyContainer>
      <Switch>
        <Route exact path="/" component={Root} />
        <Route exact path="/chat" component={Chat} />
        <Route path="/write/found" component={WriteFound} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BodyContainer>
  </>
);

export default Private;
