import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { BoardFound, NotFound } from '../pages';

const Board: React.FC<RouteComponentProps> = ({ match: { path } }) => (
  <Switch>
    <Route extact path={`${path}/found`} component={BoardFound} />
    <Route extact path={`${path}/lost`} component={() => <>lost</>} />
    <Route extact path={`${path}/market`} component={() => <>market</>} />
    <Route extact path={`${path}/book`} component={() => <>준비중</>} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Board;
