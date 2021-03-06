import React from 'react';
import styled from '@emotion/styled';
import variables from 'src/styles/variables';
import { Description, SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';

export interface SecondProps {
  beforePrice?: number;
  afterPrice?: number;
}

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

const Second: React.FC<WriteProps<SecondProps>> = ({ verify, data, dataHandler }) => (
  <>
    <SubTitle>판매가격</SubTitle>
    <PriceContainer>
      <PriceWrapper>
        <PriceInput
          value={`₩${data.beforePrice || ''}`}
          onChange={(e) => {
            const n = +e.target.value.slice(1);
            if (!Number.isSafeInteger(n) || n < 0) return;
            dataHandler({ ...data, beforePrice: n });
            verify(!!data.afterPrice);
          }}
        />
        <PriceLabel>원래 가격</PriceLabel>
      </PriceWrapper>
      <RightArrow>&#xE001;</RightArrow>
      <PriceWrapper>
        <PriceInput
          value={`₩${data.afterPrice || ''}`}
          onChange={(e) => {
            const n = +e.target.value.slice(1);
            if (!Number.isSafeInteger(n || n < 0)) return;
            dataHandler({ ...data, afterPrice: n });
            verify(!!data.beforePrice);
          }}
        />
        <PriceLabel>판매 가격</PriceLabel>
      </PriceWrapper>
    </PriceContainer>
    <Description>
      무료나눔을 원하시는 경우, 판매 가격에 0원을 입력하면 됩니다
      <br />
      원래 가격은 문제집을 발행한 출판사 공식 홈페이지를 기준으로 입력해주시기 바랍니다
    </Description>
  </>
);

export default Second;
