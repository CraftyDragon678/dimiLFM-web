import React from 'react';
import { Description, SubTitle } from 'src/components/Text';
import { getRangeText } from 'src/utils/date';
import { getName } from 'src/data/map';
import { normalTags } from 'src/data/tags';
import First, { FirstProps } from './First';
import WriteWrapper from '../WriteWrapper';

interface WriteFoundData {
  first: FirstProps;
}

export default () => (
  <WriteWrapper
    stages={{
      first: First,
    }}
    final={({ data }) => (
      <>
        <SubTitle>분실 설정</SubTitle>
        <Description>
          {getRangeText(data.first.lostDate)}
          <br />
          {data.first.lostLocation && getName(data.first.lostLocation)}
        </Description>
      </>
    )}
    title={(
      <>
        분실물
        <br />
        찾아주세요
      </>
    )}
    initialData={{
      first: {
        lostDate: [new Date(), new Date()],
        lostLocation: undefined,
      },
      second: {
        title: '',
        content: '',
      },
    } as WriteFoundData}
    stageLabels={['분실 설정']}
    boardName="lost"
    tags={normalTags}
  />
);
