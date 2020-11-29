import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div<{black: boolean}>`
  min-height: 100vh;
  display: grid;
  place-items: center;

  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;

  z-index: 20;

  background-color: ${({ black }) => black && 'rgba(0, 0, 0, 0.2)'};
`;

interface ModalProps {
  show: boolean;
  transparent?: boolean;
}

const Modal: React.FC<ModalProps> = ({ show, transparent, children }) => (
  <>
    {show && (
      <Container black={!transparent}>
        {children}
      </Container>
    )}
  </>
);

export default Modal;
