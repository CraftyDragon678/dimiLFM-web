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
import { Tag, TagTuple } from 'src/data/tags';
import { SubTitle } from 'src/components/Text';
import { TitleInput } from 'src/components/Input';
import { Viewer } from '@toast-ui/react-editor';
import Writeup from './Writeup';

interface WriteWrapperProps<T> {
  stages: {
    [U in keyof T]: React.FC<WriteProps<T[U]>>;
  },
  final: React.FC<WriteFinalProps<T>>;
  initialData: T;
  stageLabels: string[];
  title: React.ReactElement;
  boardName: string;
  tags: ((data: T) => TagTuple) | TagTuple;
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

const WriteWrapper = <
  T extends {[key: string]: any},
>({
    stages, final, initialData, stageLabels, title, boardName, tags,
  }: WriteWrapperProps<T>): React.ReactElement<WriteWrapperProps<T>> => {
  const stageKeys = Object.keys(stages) as Array<keyof T>;
  const [data, setData] = useState<T & {writeup: {title: string, content: string, tag?: Tag}}>({
    ...initialData,
    writeup: {
      title: '',
      content: '',
    },
  });
  const [valid, setValid] = useState<boolean[]>([...Array(stageKeys.length).fill(false), false, true]);
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

  const _stages = [
    ...stageKeys.map((key, idx) => {
      const E = stages[key] as React.FC<WriteProps<T[typeof key]>>;
      return (
        <E
          verify={setIndexedValid(idx)}
          data={data[key]}
          dataHandler={updateData(key)}
          tags={tags instanceof Function ? tags(data) : tags}
        />
      );
    }),
    <Writeup
      verify={setIndexedValid(stageKeys.length)}
      data={data.writeup}
      dataHandler={(newdata) => (
        setData((prev) => (
          { ...prev, writeup: newdata instanceof Function ? newdata(prev.writeup) : newdata }
        )))}
      tags={tags instanceof Function ? tags(data) : tags}
    />,
  ];

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
        when={valid.slice(0, -1).some((v) => v) && stage !== stageKeys.length + 1}
        message="정말로 나가시겠습니까? 현재 입력한 사항은 저장되지 않습니다."
      />
      <Upper>
        <Title>{title}</Title>
        <WriteIndicator index={stage} stage={[...stageLabels, '내용 작성', '완료']} />
      </Upper>
      <Content shadow>
        <ContentArrow>
          <Arrow
            left
            disable={stage === 0}
            onClick={() => setStage(stage - 1)}
          />
          <Arrow
            check={stage === stageKeys.length + 1}
            disable={!valid[stage]}
            onClick={() => (stage === stageKeys.length + 1 ? postArticle() : setStage(stage + 1))}
          />
        </ContentArrow>
        <ContentWrapper>
          {stage <= stageKeys.length ? _stages[stage] : (
            <>
              <Final data={data} />
              <SubTitle>작성글 미리보기</SubTitle>
              <TitleInput defaultValue={`${data.writeup.title} - ${data.writeup.tag}`} disabled />
              <Viewer initialValue={data.writeup.content} />
            </>
          )}
        </ContentWrapper>
      </Content>
    </Wrapper>
  );
};

export default WriteWrapper;
