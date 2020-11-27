import React from 'react';
import bon from './bon';

export interface MapData {
  data: {
    prefix: string;
    floor: number;
    width: number;
    height: number;
  },
  map: {
    [key: string]: React.ReactElement,
  },
}

const map: MapData[][] = [
  bon,
];

export const getName = (id: string): string => {
  const floor = map.flat().find((e) => e.data.prefix === id.split('/')[0]);

  const room = Object.entries(floor?.map || {}).find(([k]) => k === id.split('/')[1])?.[1];

  if (!room) return '';
  return `${floor?.data.floor}층 ${room.props['data-tip']}`;
};

export default map;
