import React from 'react';
import styled from '@emotion/styled';
import variables from '../styles/variables';

const Button = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  outline: none;
  border-radius: 40px;
  cursor: pointer;

  background: ${variables.gradient('to bottom')};
`;

interface IFab {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Fab: React.FC<IFab> = ({ children, onClick }) => {
  return (
    <Button onClick={(e) => onClick && onClick(e)}>
      {children}
    </Button>
  );
};

export default Fab;
