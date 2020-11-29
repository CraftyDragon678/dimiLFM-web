import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import { Description, SubTitle } from 'src/components/Text';
import { TitleInput } from 'src/components/Input';
import { getRangeText } from 'src/utils/date';
import { getName } from 'src/data/map';
import { normalTags } from 'src/data/tags';
import First, { FirstProps } from './First';
import Second, { SecondProps } from '../Second';
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
        <SubTitle>분실 설정</SubTitle>
        <Description>
          {getRangeText(data.first.lostDate)}
          <br />
          {data.first.lostLocation && getName(data.first.lostLocation)}
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
    stageLabels={['분실 설정', '내용 작성', '완료']}
    boardName="lost"
    tags={normalTags}
  />
);
