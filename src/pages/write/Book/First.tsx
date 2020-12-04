import React from 'react';
import styled from '@emotion/styled';
import Check from 'src/components/Check';
import { Description, SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';

export interface FirstProps {
  grade?: number;
  subject?: string;
}

const Divider = styled.div`
  height: 30px;
`;

const First: React.FC<WriteProps<FirstProps>> = ({ verify, data, dataHandler }) => (
  <>
    <SubTitle>학년을 선택해주세요</SubTitle>
    <Description>
      플래너 등 학년 구분이 없는 경우 구분 없음을 선택해주세요
    </Description>
    <Check
      value={[0]}
      names={['구분 없음', '1학년', '2학년', '3학년']}
      onChange={() => {}}
    />
    <Divider />
    <SubTitle>
      과목 설정
    </SubTitle>
    <Description>
      교과서 또는 문제집이 아닌 경우 선택하지 않고 넘어가면 됩니다
    </Description>
  </>
);

export default First;
