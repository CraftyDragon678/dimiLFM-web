import styled from '@emotion/styled';
import React from 'react';
import variables from '../styles/variables';

const Wrapper = styled.div<{enable: boolean}>`
  width: 70px;
  height: 30px;
  border-radius: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16);

  background-color: ${({ enable }) => (enable ? variables.logoColor : variables.lightGray)};
  transition: 300ms background-color ease;

  display: flex;
  align-items: center;
  padding: 0 4px;
  box-sizing: border-box;
`;

const Circle = styled.div<{enable: boolean}>`
  width: 25px; 
  height: 25px; 
  border-radius: 13px;
  background-color: white;

  transition: 300ms transform ease;
  transform: ${({ enable }) => enable && 'translateX(38px)'};
`;

interface ToggleButtonProps {
  value: boolean;
  onToggle?: (val: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, onToggle }) => (
  <Wrapper
    enable={value}
    onClick={() => {
      if (onToggle) {
        onToggle(!value);
      }
    }}
  >
    <Circle enable={value} />
  </Wrapper>
);

export default ToggleButton;
