import React from 'react';
import styled from '@emotion/styled';
import variables from 'src/styles/variables';
import Stars from 'src/components/Stars';
import { Description, SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';

export interface FirstProps {
  beforePrice?: bigint;
  afterPrice?: bigint;
  stars: number;
}

const Divider = styled.div`
  height: 30px;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriceInput = styled.input``;

const PriceLabel = styled.div`
  margin-top: 10px;
`;

const RightArrow = styled.div``;

const PriceContainer = styled.div`
  height: 200px;
  padding: 0 100px;
  border-top: 3px solid ${variables.borderColor};
  border-bottom: 3px solid ${variables.borderColor};

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;

  ${RightArrow} {
    font-size: 50px;
  }
`;

const First: React.FC<WriteProps<FirstProps>> = ({ verify, data, dataHandler }) => (
  <>
    <SubTitle>판매가격</SubTitle>
    <PriceContainer>
      <PriceWrapper>
        <PriceInput
          value={`₩${data.beforePrice || ''}`}
          onChange={(e) => {
            if (Number.isNaN(+e.target.value.slice(1))) return;
            const n = BigInt(e.target.value.slice(1));
            dataHandler({ ...data, beforePrice: n });
            verify(!!data.afterPrice && !!data.stars);
          }}
        />
        <PriceLabel>원래 가격</PriceLabel>
      </PriceWrapper>
      <RightArrow>&#xE001;</RightArrow>
      <PriceWrapper>
        <PriceInput
          value={`₩${data.afterPrice || ''}`}
          onChange={(e) => {
            if (Number.isNaN(+e.target.value.slice(1))) return;
            const n = BigInt(e.target.value.slice(1));
            dataHandler({ ...data, afterPrice: n });
            verify(!!data.beforePrice && !!data.stars);
          }}
        />
        <PriceLabel>판매 가격</PriceLabel>
      </PriceWrapper>
    </PriceContainer>
    <Divider />
    <SubTitle>
      제품 상태
    </SubTitle>
    <Description>
      현재 제품의 상태에 대해 5점 만점으로 평가해주세요
      <br />
      상세사항은 2단계에서 작성해주세요
    </Description>
    <Stars
      value={data.stars}
      size={5}
      onChange={(value) => {
        dataHandler({ ...data, stars: value });
        verify(!!data.beforePrice && !!data.afterPrice);
      }}
    />
  </>
);

export default First;
