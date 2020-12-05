import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Gallery from 'src/components/Gallery';
import variables from 'src/styles/variables';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';
import Calendar from 'react-calendar';
import ToggleButton from 'src/components/ToggleButton';
import { bookTags, bookWithSubjectTags, Tag } from 'src/data/tags';
import api from 'src/api';
import { UserType } from 'src/types/user';
import { subjectsForBoard } from 'src/data/subjects';
import Check from 'src/components/Check';

const Container = styled.div`
  background-color: white;
  padding: 16px;
`;

const OptionButton = styled.button`
  border: 1px solid ${variables.borderColor};
  background-color: white;
  border-radius: 8px;
  margin-left: 8px;

  ::after {
    content: "\uE001";
    margin-left: 8px;
    transform: rotate(90deg);
    display: inline-block;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Inner = styled.div`
  width: 720px;
  height: 520px;
  background-color: white;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;

  > div:first-of-type {
    flex: 1;
    width: 100%;
    display: grid;
    place-items: center;
  }
  > div:last-of-type {
    display: grid;
    grid-auto-flow: column;
    column-gap: 20px;
  }
`;

const RoundButton = styled(Button)<{gray?: boolean}>`
  font-size: 24px;
  font-weight: bold;
  border-radius: 9999px;
  background-color: ${({ gray }) => gray && variables.lightGray};
`;

const OptionContainer = styled.div`
  width: calc(100% - 120px);
  display: grid;
  grid-template-columns: 2fr 3fr;
  column-gap: 20px;
`;

const OptionTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: 1px solid ${variables.borderColor};
  margin-bottom: 20px;
`;

const ToggleButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  > span {
    font-size: 24px;
    margin-left: 15px;
  }
`;

const TagButton = styled(Button)<{gray?: boolean}>`
  font-size: 20px;
  border-radius: 9999px;
  width: 100px;
  background-color: ${({ gray }) => gray && variables.lightGray};
`;

const TagButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 10px;
`;

const Subjects = styled.div`
  display: grid;
  justify-content: center;
  grid-auto-flow: column;
  column-gap: 20px;
  font-size: 20px;
  margin-bottom: 70px;
`;

const Subject = styled.div<{selected: boolean}>`
  ::after {
    content: "";
    transition: 300ms width ease;
    width: ${({ selected }) => (selected ? '100%' : 0)};
    height: 5px;
    border-bottom: 4px solid ${variables.logoColor};
    display: block;
  }
`;

const Grades = styled.div`
  position: absolute;
  transform: translateY(-120px);
`;

interface Article {
  _id: string;
  title: string;
  image: string;
  user: {
    serial?: number;
    name: string;
    type: UserType;
  };
  done: boolean;
  grades: number[];
  tag: string;
  afterPrice: number;
  extra: string;
}

interface Option {
  option: {
    done: boolean;
    notdone: boolean;
    old: boolean;
    my: boolean;
  };
  tags: Tag[];
  grades: number[];
  subject: string;
  dates: Date[];
}

export default () => {
  const [modalIndex, setModalIndex] = useState(-1);
  const [option, setOption] = useState<Option>({
    option: {
      done: false,
      notdone: true,
      old: false,
      my: false,
    },
    tags: [...bookWithSubjectTags, ...bookTags],
    grades: [0],
    subject: '전체',
    dates: [new Date(2020, 0, 1), new Date()],
  });
  const [tempOption, setTempOption] = useState<Option>(option);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    let canceled = false;

    (async () => {
      const { data, status } = await api.post('/board/book/search', option);
      if (status !== 200) {
        console.error(data.message);
        return;
      }
      if (canceled) return;
      setArticles(data.data);
    })();

    return () => {
      canceled = true;
    };
  }, [option]);

  return (
    <Container>
      {[
        <OptionContainer>
          <div>
            <OptionTitle>옵션</OptionTitle>
            {Object.entries({
              done: '완료 항목', notdone: '비완료 항목', old: '오래된 순', my: '내 작성글',
            })
              .map((e) => (
                <ToggleButtonWrapper key={e[0]}>
                  <ToggleButton
                    value={tempOption.option[e[0] as keyof Option['option']]}
                    onToggle={(val) => setTempOption({
                      ...tempOption,
                      option: { ...tempOption.option, [e[0]]: val },
                    })}
                  />
                  <span>{e[1]}</span>
                </ToggleButtonWrapper>
              ))}
          </div>
          <div>
            <OptionTitle>태그</OptionTitle>
            <TagButtonWrapper>
              {[...bookWithSubjectTags, ...bookTags].map((e) => (
                <TagButton
                  gray={!tempOption.tags.includes(e)}
                  key={e}
                  onClick={() => (
                    setTempOption({
                      ...tempOption,
                      tags: tempOption.tags.includes(e)
                        ? tempOption.tags.filter((tag) => tag !== e)
                        : [...tempOption.tags, e],
                    }))}
                >
                  {`#${e}`}
                </TagButton>
              ))}
            </TagButtonWrapper>
          </div>
        </OptionContainer>,
        <Calendar
          selectRange
          value={tempOption.dates}
          onChange={(data) => setTempOption({ ...tempOption, dates: data as Date[] })}
        />,
      ].map((e, idx) => (
        <Modal key={idx.toString()} show={idx === modalIndex}>
          <Inner>
            <div>
              {e}
            </div>
            <div>
              <RoundButton
                gray
                onClick={() => {
                  setModalIndex(-1);
                  setTempOption(option);
                }}
              >
                취소
              </RoundButton>
              <RoundButton
                onClick={() => {
                  setModalIndex(-1);
                  setOption(tempOption);
                }}
              >
                적용
              </RoundButton>
            </div>
          </Inner>
        </Modal>
      ))}
      <Buttons>
        {['옵션', '날짜'].map((e, idx) => (
          <OptionButton key={e} onClick={() => setModalIndex(idx)}>{e}</OptionButton>
        ))}
      </Buttons>
      <Subjects>
        {subjectsForBoard
          .map<React.ReactNode>((e) => (
            <Subject
              selected={option.subject === e}
              onClick={() => {
                setOption({ ...option, subject: e });
                setTempOption({ ...option, subject: e });
              }}
            >
              {e}
            </Subject>
          )).reduce((prev, curr) => [prev, <>|</>, curr])}
      </Subjects>
      <Grades>
        <Check
          names={['구분 없음', '1학년', '2학년', '3학년']}
          value={option.grades}
          onChange={(indices) => {
            if ((indices.includes(0) && !option.grades.includes(0)) || indices.length === 0) {
              setOption({ ...option, grades: [0] });
              setOption({ ...option, grades: [0] });
            } else {
              setOption({ ...option, grades: indices.filter((e) => e !== 0) });
              setOption({ ...option, grades: indices.filter((e) => e !== 0) });
            }
          }}
        />
      </Grades>
      <Gallery
        data={articles.map((e) => ({
          href: `/board/book/${e._id}`,
          done: e.done,
          image: e.image,
          title: e.title,
          subtitle: `${e.grades[0] === 0
            ? e.tag
            : `${e.tag} - ${e.grades.sort((a, b) => a - b)}학년`
          }\n${e.afterPrice}원`,
        }))}
      />
    </Container>
  );
};
