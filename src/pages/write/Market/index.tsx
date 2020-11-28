import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import { Description, SubTitle } from 'src/components/Text';
import { TitleInput } from 'src/components/Input';
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
        <SubTitle>가격</SubTitle>
        <Description>
          test
        </Description>
        <SubTitle>작성글 미리보기</SubTitle>
        <TitleInput defaultValue={data.second.title} disabled />
        <Viewer initialValue={data.second.content} />
      </>
    )}
    title={<>판매합니다</>}
    initialData={{
      first: {},
      second: {
        title: '',
        content: '',
      },
    } as WriteFoundData}
    stageLabels={['판매 설정', '내용 작성', '완료']}
  />
);
