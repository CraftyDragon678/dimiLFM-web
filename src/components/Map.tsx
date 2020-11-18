import React from 'react';
import styled from '@emotion/styled';
import ReactTooltip from 'react-tooltip';
import css from '@emotion/css';
import { MapData, secondFloor } from '../data/map/bon';

interface MapProps {
  enable: boolean;
}

const Svg = styled.svg<MapProps>`
  transition: 300ms transform ease;
  transform: ${({ enable }) => enable && 'perspective(500px) translate3D(200px, 0, 0) rotate3d(3, -1, 1, 30deg)'};

  rect,
  polygon,
  ellipse,
  path {
    fill: white;
    stroke: black;
    position: relative;

    :not([data-ignore]):hover {
      fill: red;
    }
  }
`;

const genMap = (map: MapData) => ({ enable }: MapProps) => (
  <Svg version="1.1" width={map.data.width} height={map.data.height} enable={enable}>
    {Object.entries(map.map).map((e) => (
      {...e[1], props: {...e[1].props, id: `${map.data.prefix}-${e[0]}`}}
    ))}
  </Svg>
);

export const Bon = () => {
  const SecondFloor: React.FC<MapProps> = genMap(secondFloor);
  
  return (
    <div>
      <SecondFloor enable />
      <SecondFloor enable={false} />
      <SecondFloor enable />
      <ReactTooltip effect="solid" />
    </div>
  )
};