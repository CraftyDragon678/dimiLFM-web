import styled from '@emotion/styled';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import Stars from 'src/components/Stars';
import ArticleWrapper from './articleWrapper';

interface LostData {
  from: Date;
  to: Date;
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

const Description = styled.span`
  font-size: 9px;
`;

export default ({ match }: RouteComponentProps<{id: string}>) => (
  <ArticleWrapper
    board="market"
    id={match.params.id}
    describe={(data: LostData) => (
      <>
        <p>
          <AfterPrice>{`${data.afterPrice}원`}</AfterPrice>
          <BeforePrice>{`${data.beforePrice}원`}</BeforePrice>
        </p>
        <p>
          <Stars value={data.stars} />
          <Description>판매자가 직접 선택한 별점입니다</Description>
        </p>
      </>
    )}
  />
);
