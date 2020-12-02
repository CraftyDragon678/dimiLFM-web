import React from 'react';
import { RouteComponentProps } from 'react-router';
import ArticleWrapper from './articleWrapper';

interface LostData {
  from: Date;
  to: Date;
  beforePrice: number;
  afterPrice: number;
}

export default ({ match }: RouteComponentProps<{id: string}>) => (
  <ArticleWrapper
    board="market"
    id={match.params.id}
    describe={(data: LostData) => [
      `${data.beforePrice} -> ${data.afterPrice}`,
    ]}
  />
);
