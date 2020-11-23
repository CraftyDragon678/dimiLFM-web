import React from 'react';

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
