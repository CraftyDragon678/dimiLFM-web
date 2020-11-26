import mapData from '../../data/map';

export const getName = (id: string): string => (
  Object.entries(mapData.flat().find((e) => e.data.prefix === id.split('/')[0])?.map || {}).find(([k]) => k === id.split('/')[1])?.[1].props['data-tip']
);
