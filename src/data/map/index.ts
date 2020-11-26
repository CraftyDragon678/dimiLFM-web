import React from 'react';
import bon from './bon';

export interface MapData {
  data: {
    prefix: string;
    width: number;
    height: number;
  },
  map: {
    [key: string]: React.ReactElement,
  },
}

export default [
  bon,
];
