import React from 'react';
import { RouteComponentProps } from 'react-router';
import { getName } from 'src/data/map';
import { getRangeText } from 'src/utils/date';
import ArticleWrapper from './articleWrapper';

interface LostData {
  lostLocation: string;
  from: Date;
  to: Date;
}

export default ({ match }: RouteComponentProps<{id: string}>) => (
  <ArticleWrapper
    board="lost"
    id={match.params.id}
    describe={(data: LostData) => [
      `[분실 일시] ${getRangeText([new Date(data.from), new Date(data.to)])}`,
      `[분실 장소] ${getName(data.lostLocation)}`,
    ]}
  />
);
