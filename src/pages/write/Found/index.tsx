import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import { Description, SubTitle } from 'src/components/Text';
import { TitleInput } from 'src/components/Input';
import { getRangeText } from 'src/utils/date';
import { getName } from 'src/data/map';
import First, { FirstProps } from './First';
import Second, { SecondProps } from './Second';
import Third, { ThirdProps } from './Third';
import WriteWrapper from '../WriteWrapper';

interface WriteFoundData {
  first: FirstProps;
  second: SecondProps;
  third: ThirdProps;
}

export default () => (
  <WriteWrapper
    stages={{
      first: First, second: Second, third: Third,
    }}
    final={({ data }) => (
      <>
        <SubTitle>발견 설정</SubTitle>
        <Description>
          {getRangeText(data.first.foundDate)}
          <br />
          {data.first.foundLocation && getName(data.first.foundLocation)}
        </Description>
        <SubTitle>{data.third.radioIndex === 2 ? '희망 장소' : '물건이 있는 곳'}</SubTitle>
        <Description>
          {(data.third.radioIndex !== 0 && data.third.wantLocation)
            ? getName(data.third.wantLocation)
            : '발견 장소에 그대로 두었습니다.'}
        </Description>
        <SubTitle>작성글 미리보기</SubTitle>
        <TitleInput defaultValue={data.second.title} disabled />
        <Viewer initialValue={data.second.content} />
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
        title: '',
        content: '',
      },
      third: {
        radioIndex: -1,
      },
    } as WriteFoundData}
    stageLabels={['발견 설정', '내용 작성', '희망 장소', '완료']}
    boardName="found"
  />
);
