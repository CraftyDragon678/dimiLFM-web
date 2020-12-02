import React from 'react';
import { RouteComponentProps } from 'react-router';
import { getName } from 'src/data/map';
import { getRangeText } from 'src/utils/date';
import ArticleWrapper from './articleWrapper';

interface FoundData {
  foundLocation: string;
  wantLocation?: string;
  from: Date;
  to: Date;
  radioIndex: number;
}

export default ({ match }: RouteComponentProps<{id: string}>) => (
  <ArticleWrapper
    board="found"
    id={match.params.id}
    describe={(data: FoundData) => [
      `[발견 일시] ${getRangeText([new Date(data.from), new Date(data.to)])}`,
      `[발견 장소] ${getName(data.foundLocation)}`,
      `${data.radioIndex === 0
        ? '발견 장소에 물건이 그대로 있습니다'
        : `[희망 장소] ${data.wantLocation && getName(data.wantLocation)}${data.radioIndex === 1 ? '에 맡겼습니다' : '에서 가지고 있습니다.'}`
      }`,
    ]}
  />
);
