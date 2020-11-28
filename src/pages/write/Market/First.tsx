import React from 'react';
import styled from '@emotion/styled';
import variables from 'src/styles/variables';
import { Description, SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';

export interface FirstProps {
  beforePrice?: number;
  afterPrice?: number;
  stars?: number;
}

const Divider = styled.div`
  height: 30px;
`;

const PriceContainer = styled.div`
  border-top: 3px solid ${variables.borderColor};
  border-bottom: 3px solid ${variables.borderColor};
  display: flex;
  height: 200px;
`;

const PriceInput = styled.input`
`;

const First: React.FC<WriteProps<FirstProps>> = ({ verify, data, dataHandler }) => (
  <>
    <SubTitle>판매가격</SubTitle>
    <PriceContainer>
      <PriceInput />
      <div>&#xE001;</div>
      <PriceInput />
    </PriceContainer>
    <Divider />
    <SubTitle>
      제품 상태
    </SubTitle>
    <Description>
      현재 제품의 상태에 대해  5점 만점으로 평가해주세요
      <br />
      상세사항은 2단계에서 작성해주세요
    </Description>
  </>
);

export default First;
