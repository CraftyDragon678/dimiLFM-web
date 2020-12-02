import React from 'react';
import { Description, SubTitle } from 'src/components/Text';
import { getRangeText } from 'src/utils/date';
import { getName } from 'src/data/map';
import { normalTags } from 'src/data/tags';
import First, { FirstProps } from './First';
import Second, { SecondProps } from './Second';
import WriteWrapper from '../WriteWrapper';

interface WriteFoundData {
  first: FirstProps;
  second: SecondProps;
}

export default () => (
  <WriteWrapper
    stages={{
      first: First, second: Second,
    }}
    final={({ data }) => (
      <>
        <SubTitle>발견 설정</SubTitle>
        <Description>
          {getRangeText(data.first.foundDate)}
          <br />
          {data.first.foundLocation && getName(data.first.foundLocation)}
        </Description>
        <SubTitle>{data.second.radioIndex === 2 ? '희망 장소' : '물건이 있는 곳'}</SubTitle>
        <Description>
          {(data.second.radioIndex !== 0 && data.second.wantLocation)
            ? getName(data.second.wantLocation)
            : '발견 장소에 그대로 두었습니다.'}
        </Description>
      </>
    )}
    title={(
      <>
        분실물
        <br />
        찾아가세요
      </>
    )}
    initialData={{
      first: {
        foundDate: [new Date(), new Date()],
      },
      second: {
        radioIndex: -1,
      },
    } as WriteFoundData}
    stageLabels={['발견 설정', '희망 장소']}
    boardName="found"
    tags={normalTags}
  />
);
