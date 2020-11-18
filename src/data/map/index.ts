export interface MapData {
  data: {
    prefix: string;
    width: number;
    height: number;
  },
  map: {
    [key: string]: JSX.Element,
  },
};
