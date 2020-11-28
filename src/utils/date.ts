import dayjs from 'dayjs';
import time from 'src/data/time';

export const getRangeText = (range: Date[]) => {
  const oneday = (
    new Date(range[0]).setHours(0, 0, 0, 0) === new Date(range[1]).setHours(0, 0, 0, 0)
  );

  const weekend = range[0].getDay() === 0 || range[0].getDay() === 6;
  const t = (weekend ? time.weekend : time.weekday)
    .find((e) => (
      e.from.getTime() <= new Date(range[0]).setFullYear(1970, 0, 1)
        && new Date(range[1]).setFullYear(1970, 0, 1) <= e.to.getTime()
    ));

  return oneday
    ? `${dayjs(range[0]).format('YYYY-MM-DD HH:mm')}-${dayjs(range[1]).format('HH:mm')} (${t?.tag})`
    : `${dayjs(range[0]).format('YYYY-MM-DD')} ~ ${dayjs(range[1]).format('YYYY-MM-DD')}`;
};

export default {
  getRangeText,
};
