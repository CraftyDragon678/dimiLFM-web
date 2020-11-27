const t = (hour: number, min: number) => new Date(1970, 0, 1, hour, min);

interface TimeTable {
  from: Date,
  to: Date,
  tag: string;
}

const weekday: TimeTable[] = [
  {
    from: t(7, 0),
    to: t(9, 0),
    tag: '아침시간',
  },
  {
    from: t(9, 0),
    to: t(10, 0),
    tag: '1교시',
  },
  {
    from: t(10, 0),
    to: t(11, 0),
    tag: '2교시',
  },
  {
    from: t(11, 0),
    to: t(12, 0),
    tag: '3교시',
  },
  {
    from: t(12, 0),
    to: t(12, 50),
    tag: '4교시',
  },
  {
    from: t(12, 50),
    to: t(13, 50),
    tag: '점심시간',
  },
  {
    from: t(13, 50),
    to: t(14, 50),
    tag: '5교시',
  },
  {
    from: t(14, 50),
    to: t(15, 50),
    tag: '6교시',
  },
  {
    from: t(15, 50),
    to: t(16, 40),
    tag: '7교시',
  },
  {
    from: t(16, 40),
    to: t(17, 10),
    tag: '청소 및 종례',
  },
  {
    from: t(17, 10),
    to: t(18, 35),
    tag: '방과후',
  },
  {
    from: t(18, 35),
    to: t(19, 50),
    tag: '저녁시간',
  },
  {
    from: t(19, 50),
    to: t(21, 10),
    tag: '야자1',
  },
  {
    from: t(21, 10),
    to: t(21, 30),
    tag: '쉬는시간',
  },
  {
    from: t(21, 30),
    to: t(23, 0),
    tag: '야자2',
  },
  {
    from: t(23, 0),
    to: t(7, 0),
    tag: '기숙사',
  },
];

const weekend: TimeTable[] = [
  {
    from: t(7, 0),
    to: t(9, 0),
    tag: '아침시간',
  },
  {
    from: t(9, 0),
    to: t(12, 0),
    tag: '오전',
  },
  {
    from: t(12, 0),
    to: t(14, 0),
    tag: '점심시간',
  },
  {
    from: t(14, 0),
    to: t(18, 0),
    tag: '오후',
  },
  {
    from: t(18, 0),
    to: t(20, 0),
    tag: '저녁시간',
  },
  {
    from: t(20, 0),
    to: t(22, 30),
    tag: '야자',
  },
  {
    from: t(22, 30),
    to: t(7, 0),
    tag: '기숙사',
  },
];

export default {
  weekday,
  weekend,
};
