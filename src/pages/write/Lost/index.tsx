import React, { useState } from 'react';
import styled from '@emotion/styled';
import WriteIndicator from 'src/components/WriteIndicator';
import { Description, SubTitle } from 'src/components/Text';
import { getRangeText } from 'src/utils/date';
import { getName } from 'src/data/map';
import { Viewer } from '@toast-ui/react-editor';
import { TitleInput } from 'src/components/Input';
import Box from '../../../components/Box';
import variables from '../../../styles/variables';
import First, { FirstProps } from './First';
import Second, { SecondProps } from './Second';
import Arrow from '../../../components/Arrow';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Upper = styled(Box)`
  height: 200px;
  background-color: ${variables.logoColor};
  color: white;
  display: flex;
  align-items: center;
  padding: 60px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: bold;
  color: white;
  line-height: 1.5;
  flex: 1;
`;

const Content = styled(Box)`
  margin-top: 16px;
`;

const ContentArrow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  margin: 64px;
`;

interface WriteLostData {
  first: FirstProps;
  second: SecondProps;
}

export default () => {
  const [data, setData] = useState<WriteLostData>({
    first: {
      foundDate: [new Date(), new Date()],
      foundLocation: undefined,
    },
    second: {
      title: '',
      content: '',
    },
  });
  const [valid, setValid] = useState([false]);
  const [stage, setStage] = useState(0);

  const setIndexedValid = (index: number) => (value: boolean) => {
    setValid([...valid.slice(0, index), value, ...valid.slice(index + 1)]);
  };

  const updateData = <T extends keyof WriteLostData>(key: T) => (
    (newdata: WriteLostData[T] | ((prev: WriteLostData[T]) => WriteLostData[T])) => (
      setData((prev) => ({ ...prev, [key]: typeof newdata === 'function' ? newdata(prev[key]) : newdata }))
    ));

  const stages = [
    <First
      verify={setIndexedValid(0)}
      data={data.first}
      dataHandler={updateData('first')}
    />,
    <Second
      verify={setIndexedValid(1)}
      data={data.second}
      dataHandler={updateData('second')}
    />,
    <>
      <SubTitle>분실 설정</SubTitle>
      <Description>
        {getRangeText(data.first.foundDate)}
        <br />
        {data.first.foundLocation && getName(data.first.foundLocation)}
      </Description>
      <SubTitle>작성글 미리보기</SubTitle>
      <TitleInput defaultValue={data.second.title} disabled />
      <Viewer initialValue={data.second.content} />
    </>,
  ];

  return (
    <Wrapper>
      <Upper>
        <Title>
          분실물
          <br />
          찾아주세요
        </Title>
        <WriteIndicator index={stage} stage={['분실 설정', '내용 작성', '완료']} />
      </Upper>
      <Content shadow>
        <ContentArrow>
          <Arrow
            left
            disable={stage === 0}
            onClick={() => setStage(stage - 1)}
          />
          <Arrow
            disable={!valid[stage]}
            onClick={() => setStage(stage + 1)}
          />
        </ContentArrow>
        <ContentWrapper>
          {stages[stage]}
        </ContentWrapper>
      </Content>
    </Wrapper>
  );
};
