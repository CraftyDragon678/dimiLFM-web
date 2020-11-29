import React from 'react';
import styled from '@emotion/styled';
import Gallery from 'src/components/Gallery';
import Options from 'src/components/Options';
import variables from 'src/styles/variables';

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

export default () => {
  return (
    <Container>
      <Buttons>
        <OptionButton>옵션</OptionButton>
        <OptionButton>날짜</OptionButton>
        <OptionButton>장소</OptionButton>
      </Buttons>
      <Gallery />
    </Container>
  );
};
