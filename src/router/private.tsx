import React from 'react';
import styled from '@emotion/styled';
import { Redirect, Route, Switch } from 'react-router';
import variables from 'src/styles/variables';
import {
  Root, Chat, NotFound, WriteFound, WriteLost, WriteMarket,
} from '../pages';
import Header from '../components/Header';

const BodyContainer = styled.div`
  margin: 0 min(50vw - 300px, 250px);
  flex: 1;
  display: flex;

  ${variables.mq[0]} {
    margin: 0 10px;
  }
`;

const Private = () => (
  <>
    <Header />
    <BodyContainer>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/board/found" />} />
        <Route path="/board/" component={Root} />
        <Route path="/search/" component={Root} />
        <Route path="/chat" component={Chat} />
        <Route path="/write/found" component={WriteFound} />
        <Route path="/write/lost" component={WriteLost} />
        <Route path="/write/market" component={WriteMarket} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BodyContainer>
  </>
);

export default Private;
