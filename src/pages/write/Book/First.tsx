import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Check from 'src/components/Check';
import Button from 'src/components/Button';
import { Subject, subjects } from 'src/data/subjects';
import { WriteProps } from 'src/types/write';
import { Description, SubTitle } from 'src/components/Text';
import variables from 'src/styles/variables';
import addSvg from 'src/assets/images/add.svg';

export interface FirstProps {
  grade?: number[];
  subject?: string;
}

const Divider = styled.div`
  height: 50px;
`;

const SmallText = styled.span`
  font-size: 20px;
`;

const SubjectContainer = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 30px;
  row-gap: 30px;
`;

const RoundButton = styled(Button)<{gray: boolean}>`
  border-radius: 9999px;
  background-color: ${({ gray }) => gray && variables.gray};
  font-size: 20px;
  font-weight: bold;
`;

const AddSubjectButton = styled(Button)`
  border-radius: 9999px;
  background-color: ${variables.blue};
  font-size: 20px;
  font-weight: bold;
  /* ::after {
    content: "";
    width: 10px;
    height: 10px;
    background-color: ${variables.blue};
    clip-path: url(${addSvg});
    display: block;
    position: absolute;
  } */
`;

const AddSubjectInput = styled.input`
  background: transparent;
  border: none;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const First: React.FC<WriteProps<FirstProps>> = ({ verify, data, dataHandler }) => {
  const [addSubject, setAddSubject] = useState(false);
  const addSubjectFirst = useRef(false);

  return (
    <>
      <SubTitle>학년을 선택해주세요</SubTitle>
      <Description>
        플래너 등 학년 구분이 없는 경우 구분 없음을 선택해주세요
      </Description>
      <Check
        value={data.grade || []}
        names={['구분 없음', '1학년', '2학년', '3학년']}
        onChange={(indices) => {
          if (!data.grade?.includes(0) && indices.includes(0)) {
            dataHandler({ ...data, grade: [0] });
          } else {
            dataHandler({ ...data, grade: indices.filter((e) => e !== 0) });
          }
          verify(!!indices.length);
        }}
      />
      <Divider />
      <SubTitle>
        과목 설정
        <SmallText>(교과서 또는 문제집인 경우)</SmallText>
      </SubTitle>
      <Description>
        교과서 또는 문제집이 아닌 경우 선택하지 않고 넘어가면 됩니다
      </Description>
      <SubjectContainer>
        {subjects.map((e) => (
          <RoundButton
            key={e}
            gray={e !== data.subject}
            onClick={() => {
              dataHandler({ ...data, subject: e === data.subject ? undefined : e });
              setAddSubject(false);
            }}
          >
            {e}
          </RoundButton>
        ))}
        <AddSubjectButton
          onClick={() => {
            if (!addSubject) {
              setAddSubject(true);
              dataHandler({ ...data, subject: '' });
              addSubjectFirst.current = true;
            }
          }
        }>
          {addSubject ? (
            <AddSubjectInput
              ref={(ref) => {
                if (ref && addSubjectFirst.current) ref.focus();
                addSubjectFirst.current = false;
              }}
              value={data.subject}
              onChange={(e) => {
                dataHandler({ ...data, subject: e.target.value });
              }}
              onBlur={(e) => {
                dataHandler({ ...data, subject: e.target.value.trim() });
                if (subjects.includes(e.target.value.trim() as Subject)) {
                  setAddSubject(false);
                }
              }}
            />
          ) : '과목 추가'}
        </AddSubjectButton>
      </SubjectContainer>
    </>
  );
};
export default First;
