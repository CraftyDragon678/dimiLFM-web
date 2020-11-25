import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import ReactTooltip from 'react-tooltip';
import { MapData } from '../data/map';
import bonData from '../data/map/bon';
import variables from '../styles/variables';
import Button from './Button';

interface MapProps {
  enable: boolean;
}

const Svg = styled.svg<MapProps>`
  transition: .5s transform ease, .5s opacity ease, 1s visibility ease;
  height: 400px;
  transform: ${({ enable }) => enable && 'perspective(500px) translate3D(250px, -100px, 0) rotate3d(3, -1, 1, 30deg)'};
  opacity: ${({ enable }) => enable || 0};
  visibility: ${({ enable }) => enable || 'hidden'};
  position: absolute;

  rect,
  polygon,
  ellipse,
  path {
    fill: white;
    stroke: black;
    position: relative;
    pointer-events: ${({ enable }) => enable || 'none'};

    :not([data-ignore]):hover {
      fill: red;
    }
  }
`;

const genMap = (map: MapData) => ({ enable }: MapProps) => (
  <Svg version="1.1" viewBox={`0 0 ${map.data.width} ${map.data.height}`} enable={enable}>
    {Object.entries(map.map).map(([name, Element]) => (
      {
        ...Element,
        props: {
          ...Element.props,
          id: `${map.data.prefix}-${name}`,
        },
        key: name,
      }
    ))}
  </Svg>
);

const genMaps = (maps: MapData[]) => maps.map((map) => genMap(map));

const MapItem = styled.div`
  display: relative;
`;

const Floor = styled(Button)`

`;

const Container = styled.div`
  width: 800px;
  height: 500px;
  margin: 16px;
  border: 1px solid ${variables.borderColor};
  border-radius: 16px;
`;

const Map: React.FC<{maps: MapData[]}> = ({ maps }) => {
  const [floor, setFloor] = useState(-1);
  const mapsFC: React.FC<MapProps>[] = useMemo(() => genMaps(maps), [maps]);

  return (
    <Container>
      {mapsFC.map((MapFC, idx) => (
        <MapItem key={maps[idx].data.prefix}>
          <Floor onClick={() => setFloor(idx)}>{`${idx + 1}층`}</Floor>
        </MapItem>
      ))}
      {mapsFC.map((MapFC, idx) => (
        <MapFC key={maps[idx].data.prefix} enable={idx === floor} />
      ))}
      <ReactTooltip effect="solid" />
    </Container>
  );
};

export default () => <Map maps={bonData} />;
