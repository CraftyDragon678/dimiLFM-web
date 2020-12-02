import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Prompt } from 'react-router';
import { WriteFinalProps, WriteProps } from 'src/types/write';
import Box from 'src/components/Box';
import variables from 'src/styles/variables';
import WriteIndicator from 'src/components/WriteIndicator';
import Arrow from 'src/components/Arrow';
import api from 'src/api';
import history from 'src/router/history';
import { TagTuple } from 'src/data/tags';

interface WriteWrapperProps<T> {
  stages: {
    [U in keyof T]: React.FC<WriteProps<T[U]>>;
  },
  final: React.FC<WriteFinalProps<T>>;
  initialData: T;
  stageLabels: string[];
  title: React.ReactElement;
  boardName: string;
  tags: TagTuple;
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
  margin-top: 10px;
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: bold;
  color: white;
  line-height: 1.5;
  flex: 1;
`;

const Content = styled(Box)`
  margin: 16px 0;
  flex: 1;
`;

const ContentArrow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  margin: 64px;
`;

const WriteWrapper = <T, >({
  stages, final, initialData, stageLabels, title, boardName, tags,
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
        tags={tags}
      />
    );
  });

  const Final = final;

  const postArticle = async () => {
    setIndexedValid(stageKeys.length)(false);
    const { data: res, status } = await api.post(`/board/${boardName}/`,
      (Object.values(data) as T[keyof T][]).reduce((prev, curr) => ({ ...prev, ...curr })));
    if (status === 200) {
      history.push(`/board/${boardName}/${res._id}`);
      return;
    }
    setIndexedValid(stageKeys.length)(true);
  };

  return (
    <Wrapper>
      <Prompt
        when={valid[stageKeys.length]}
        message="정말로 나가시겠습니까? 현재 입력한 사항은 저장되지 않습니다."
      />
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
            onClick={() => (stage === stageKeys.length ? postArticle() : setStage(stage + 1))}
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
