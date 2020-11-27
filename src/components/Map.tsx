import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import ReactTooltip from 'react-tooltip';
import { MapData } from '../data/map';
import bonData from '../data/map/bon';
import variables from '../styles/variables';
import Button from './Button';
import Select from './Select';

interface MapDataProps {
  enable: boolean;
  onClick: (id: string) => void;
  selected: string[];
}

const Svg = styled.svg<{enable: boolean}>`
  transition: .5s transform ease, .5s opacity ease, 1s visibility ease;
  height: 400px;
  transform: perspective(500px);
  transform: ${({ enable }) => enable && 'perspective(500px) translate3D(250px, -100px, 0) rotate3d(1, -1, 1, 30deg)'};
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

  .selected {
    fill: ${variables.magenta};
  }
`;

const genMap = (map: MapData) => ({ enable, onClick, selected }: MapDataProps) => (
  <Svg version="1.1" viewBox={`0 0 ${map.data.width} ${map.data.height}`} enable={enable}>
    {Object.entries(map.map).map(([name, Element]) => (
      {
        ...Element,
        props: {
          ...Element.props,
          id: `${map.data.prefix}/${name}`,
          onClick: (e: React.MouseEvent<SVGElement>) => e.currentTarget.getAttribute('data-ignore') || onClick(e.currentTarget.id),
          className: selected.includes(name) ? 'selected' : '',
        },
        key: name,
      }
    ))}
  </Svg>
);

const genMaps = (maps: MapData[]) => maps.map((map) => genMap(map));

const MapItem = styled.div`
  margin-top: 30px;
  display: grid;
  grid-row-gap: 10px;
`;

const Floor = styled(Button)<{selected: boolean}>`
  background-color: ${({ selected }) => selected && variables.logoColor};
`;

const Container = styled.div`
  width: 800px;
  height: 500px;
  margin: 16px;
  padding: 16px;
  border: 1px solid ${variables.borderColor};
  border-radius: 16px;
`;

interface MapProps {
  onClick: (ids: string[]) => void;
  selected: string[] | string;
}

const Map: React.FC<MapProps> = ({ onClick, selected }) => {
  const maps = bonData;
  const [floor, setFloor] = useState(-1);
  const mapsFC: React.FC<MapDataProps>[] = useMemo(() => genMaps(maps), [maps]);

  return (
    <Container>
      <Select options={['본관', '신관', '학봉관', '우정학사']} index={0} onChange={() => {}} />
      <MapItem>
        {mapsFC.map((_, idx) => (
          <Floor
            key={maps[idx].data.prefix}
            onClick={() => setFloor(idx)}
            selected={floor === idx}
          >
            {`${idx + 1}층`}
          </Floor>
        ))}
      </MapItem>
      {mapsFC.map((MapFC, idx) => (
        <MapFC
          key={maps[idx].data.prefix}
          enable={idx === floor}
          onClick={(v) => (
            Array.isArray(selected)
              ? selected.includes(v)
                ? onClick(selected.filter((e) => e !== v))
                : onClick([...selected, v])
              : onClick([v])
          )}
          selected={
            Array.isArray(selected)
              ? selected
                .filter((e) => e.startsWith(maps[idx].data.prefix))
                .map((e) => e.split('/')[1])
              : [selected]
                .filter((e) => e.startsWith(maps[idx].data.prefix))
                .map((e) => e.split('/')[1])
          }
        />
      ))}
      <ReactTooltip effect="solid" />
    </Container>
  );
};

// export default () => <Map maps={bonData} />;
export default Map;
