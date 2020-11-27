import React, { useState } from 'react';
import styled from '@emotion/styled';
import Box from '../../../components/Box';
import variables from '../../../styles/variables';
import First, { FirstProps } from './First';
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
}

export default () => {
  const [data, setData] = useState<WriteFoundData>({
    first: {
      foundDate: [new Date(), new Date()],
      foundLocation: undefined,
    },
  });
  const [valid, setValid] = useState(false);

  return (
    <Wrapper>
      <Upper>분실물 찾아가세요</Upper>
      <Content shadow>
        <ContentArrow>
          <Arrow left disable />
          <Arrow disable={!valid} />
        </ContentArrow>
        <ContentWrapper>
          <First
            verify={(isValid) => setValid(isValid)}
            data={data.first}
            dataHandler={(newdata) => setData({ ...data, first: newdata })}
          />
        </ContentWrapper>
      </Content>
    </Wrapper>
  );
};
