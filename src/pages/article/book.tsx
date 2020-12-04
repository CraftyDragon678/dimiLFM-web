import styled from '@emotion/styled';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import Stars from 'src/components/Stars';
import ArticleWrapper from './articleWrapper';

interface BookData {
  grade: number[];
  subject?: string;
  beforePrice: number;
  afterPrice: number;
  stars: number;
}

const AfterPrice = styled.span`
  font-size: 60px;
  font-weight: bold;
`;

const BeforePrice = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #dbdbdb;
  text-decoration: line-through;
  margin-left: 20px;
`;

export default ({ match }: RouteComponentProps<{id: string}>) => (
  <ArticleWrapper
    board="book"
    id={match.params.id}
    describe={(data: BookData) => (
      <div>
        <AfterPrice>{`${data.afterPrice}원`}</AfterPrice>
        <BeforePrice>{`${data.beforePrice}원`}</BeforePrice>
      </div>
    )}
  />
);
