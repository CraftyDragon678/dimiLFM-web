import React, { useState } from 'react';
import styled from '@emotion/styled';
import WriteIndicator from 'src/components/WriteIndicator';
import Box from '../../../components/Box';
import variables from '../../../styles/variables';
import First, { FirstProps } from './First';
import Second, { SecondProps } from './Second';
import Third, { ThirdProps } from './Third';
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

interface WriteFoundData {
  first: FirstProps;
  second: SecondProps;
  third: ThirdProps;
}

export default () => {
  const [data, setData] = useState<WriteFoundData>({
    first: {
      foundDate: [new Date(), new Date()],
      foundLocation: undefined,
    },
    second: {
      title: '',
      content: '',
    },
    third: {
      radioIndex: -1,
      foundLocation: undefined,
    },
  });
  const [valid, setValid] = useState([false, false]);
  const [stage, setStage] = useState(2);

  const setIndexedValid = (index: number) => (value: boolean) => {
    setValid([...valid.slice(0, index), value, ...valid.slice(index + 1)]);
  };

  const updateData = <T extends keyof WriteFoundData>(key: T) => (
    (newdata: WriteFoundData[T] | ((prev: WriteFoundData[T]) => WriteFoundData[T])) => (
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
    <Third
      verify={setIndexedValid(2)}
      data={data.third}
      dataHandler={updateData('third')}
    />,
  ];

  return (
    <Wrapper>
      <Upper>
        <Title>
          분실물
          <br />
          찾아가세요
        </Title>
        <WriteIndicator index={stage} stage={['발견 설정', '내용 작성', '희망 장소', '완료']} />
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
