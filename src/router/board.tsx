import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { NotFound } from '../pages';

const Board: React.FC<RouteComponentProps> = ({ match: { path } }) => (
  <Switch>
    <Route extact path={`${path}/found`} component={() => <>found</>} />
    <Route extact path={`${path}/lost`} component={() => <>lost</>} />
    <Route extact path={`${path}/market`} component={() => <>market</>} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Board;
