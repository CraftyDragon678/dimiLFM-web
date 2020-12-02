import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import {
  ArticleFound, ArticleLost, ArticleMarket, BoardFound, BoardLost, BoardMarket, NotFound,
} from '../pages';

const Board: React.FC<RouteComponentProps> = ({ match: { path } }) => (
  <Switch>
    <Route extact path={`${path}/found/:id`} component={ArticleFound} />
    <Route extact path={`${path}/lost/:id`} component={ArticleLost} />
    <Route extact path={`${path}/market/:id`} component={ArticleMarket} />
    <Route extact path={`${path}/found`} component={BoardFound} />
    <Route extact path={`${path}/lost`} component={BoardLost} />
    <Route extact path={`${path}/market`} component={BoardMarket} />
    <Route extact path={`${path}/book`} component={() => <>준비중</>} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Board;
