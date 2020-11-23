import React, { useState } from 'react';
import styled from '@emotion/styled';
import ReactTooltip from 'react-tooltip';
import { MapData } from '../data/map';
import bonData from '../data/map/bon';

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
      { ...e[1], props: { ...e[1].props, id: `${map.data.prefix}-${e[0]}` }, key: e[0] }
    ))}
  </Svg>
);

const genMaps = (maps: MapData[]) => maps.map((map) => genMap(map));

const Map = (maps: MapData[]) => {
  const [floor, setFloor] = useState(0);
  const mapsFC: React.FC<MapProps>[] = genMaps(maps);

  return (
    <div>
      {mapsFC.map((MapFC, idx) => (
        <MapFC key={maps[idx].data.prefix} enable={floor === idx} />
      ))}
      <ReactTooltip effect="solid" />
    </div>
  );
}

export default () => Map(bonData);
