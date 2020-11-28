import styled from '@emotion/styled';
import React from 'react';
import variables from '../styles/variables';

interface ArrowProps {
  left?: boolean;
  disable?: boolean;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const Svg = styled.svg<{enable: boolean}>`
  fill: transparent;
  stroke: ${({ enable }) => (enable ? variables.logoColor : variables.lightGray)};
  stroke-width: 2px;
  cursor: ${({ enable }) => enable && 'pointer'};
`;

const Arrow: React.FC<ArrowProps> = ({ left, disable, onClick }) => (
  <Svg version="1.1" width="27.3px" height="15.5px" enable={!disable} onClick={(e) => disable || (onClick && onClick(e))}>
    {left ? (
      <>
        <polyline points="26.3,7.8 1,7.8 7.8,1" />
        <line x1="1" y1="7.8" x2="7.8" y2="14.5" />
      </>
    ) : (
      <>
        <polyline points="1,7.8 26.3,7.8 19.5,1" />
        <line x1="26.3" y1="7.8" x2="19.5" y2="14.5" />
      </>
    )}
  </Svg>

);

export default Arrow;
