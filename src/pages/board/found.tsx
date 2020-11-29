import React, { useState } from 'react';
import styled from '@emotion/styled';
import Gallery from 'src/components/Gallery';
import Options from 'src/components/Options';
import variables from 'src/styles/variables';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

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

  div:first-of-type {
    flex: 1;
  }
  div:last-of-type {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 20px;
  }
`;

const RoundButton = styled(Button)<{gray?: boolean}>`
  font-size: 24px;
  font-weight: bold;
  border-radius: 9999px;
  background-color: ${({ gray }) => gray && variables.lightGray};
`;

export default () => {
  const [modalIndex, setModalIndex] = useState(1);
  return (
    <Container>
      {['옵션', '날짜', '장소'].map((e, idx) => (
        <Modal key={e} show={idx === modalIndex}>
          <Inner>
            <div>
              {e}
            </div>
            <div>
              <RoundButton gray onClick={() => setModalIndex(-1)}>취소</RoundButton>
              <RoundButton>적용</RoundButton>
            </div>
          </Inner>
        </Modal>
      ))}
      <Buttons>
        {['옵션', '날짜', '장소'].map((e, idx) => (
          <OptionButton key={e} onClick={() => setModalIndex(idx)}>{e}</OptionButton>
        ))}
      </Buttons>
      <Gallery />
    </Container>
  );
};
