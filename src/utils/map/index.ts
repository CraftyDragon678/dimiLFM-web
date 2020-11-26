import mapData from '../../data/map';

export const getName = (id: string): string => {
  const floor = mapData.flat().find((e) => e.data.prefix === id.split('/')[0]);

  const room = Object.entries(floor?.map || {}).find(([k]) => k === id.split('/')[1])?.[1];

  if (!room) return '';
  return `${floor?.data.floor}층 ${room.props['data-tip']}`;
};
