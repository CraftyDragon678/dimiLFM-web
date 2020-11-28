import styled from '@emotion/styled';
import React, { useState } from 'react';
import { WriteFinalProps, WriteProps } from 'src/types/write';
import Box from 'src/components/Box';
import variables from 'src/styles/variables';
import WriteIndicator from 'src/components/WriteIndicator';
import Arrow from 'src/components/Arrow';

interface WriteWrapperProps<T> {
  stages: {
    [U in keyof T]: React.FC<WriteProps<T[U]>>;
  },
  final: React.FC<WriteFinalProps<T>>;
  initialData: T;
  stageLabels: string[];
  title: React.ReactElement;
}

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

const WriteWrapper = <T, >({
  stages, final, initialData, stageLabels, title,
}: WriteWrapperProps<T>): React.ReactElement<WriteWrapperProps<T>> => {
  const stageKeys = Object.keys(stages) as Array<keyof T>;
  const [data, setData] = useState<T>(initialData);
  const [valid, setValid] = useState([...Array(stageKeys.length).fill(false), true]);
  const [stage, setStage] = useState(0);

  const setIndexedValid = (index: number) => (value: boolean) => {
    setValid([...valid.slice(0, index), value, ...valid.slice(index + 1)]);
  };

  const updateData = <U extends keyof T>(key: U) => (
    (newdata: T[U] | ((prev: T[U]) => T[U])) => (
      setData((prev) => (
        { ...prev, [key]: newdata instanceof Function ? newdata(prev[key]) : newdata }
      ))
    ));

  const _stages = stageKeys.map((key, idx) => {
    const E = stages[key] as React.FC<WriteProps<T[typeof key]>>;
    return (
      <E
        verify={setIndexedValid(idx)}
        data={data[key]}
        dataHandler={updateData(key)}
      />
    );
  });

  const Final = final;

  return (
    <Wrapper>
      <Upper>
        <Title>{title}</Title>
        <WriteIndicator index={stage} stage={stageLabels} />
      </Upper>
      <Content shadow>
        <ContentArrow>
          <Arrow
            left
            disable={stage === 0}
            onClick={() => setStage(stage - 1)}
          />
          <Arrow
            check={stage === stageKeys.length}
            disable={!valid[stage]}
            onClick={() => setStage(stage + 1)}
          />
        </ContentArrow>
        <ContentWrapper>
          {stage < stageKeys.length ? _stages[stage] : <Final data={data} /> }
        </ContentWrapper>
      </Content>
    </Wrapper>
  );
};

export default WriteWrapper;
