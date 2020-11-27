import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import ReactCalendar from 'react-calendar';
import dayjs from 'dayjs';
import variables from '../styles/variables';
import time from '../data/time';
import Select from './Select';

const Wrapper = styled.div`
  margin: 16px;
  display: grid;
  grid-template-columns: 350px 200px;
`;

const DateButton = styled.div`
  width: 300px;
  height: 30px;
  border: 1px solid ${variables.borderColor};
  padding: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  display: inline-block;
  user-select: none;
  text-align: center;
`;

const Calendar = styled(ReactCalendar)`
  position: absolute;
  margin-top: 16px;
`;

interface DatetimeRangePickerProps {
  value: Date[];
  onChange: (range: Date[]) => void;
}

const DatetimeRangePicker: React.FC<DatetimeRangePickerProps> = ({ value, onChange }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [shift, setShift] = useState(false);

  useEffect(() => {
    const shiftHandler = (direction: 'down' | 'up') => () => {
      setShift(direction === 'down');
    };
    document.addEventListener('keydown', shiftHandler('down'));
    document.addEventListener('keyup', shiftHandler('up'));
    return () => {
      document.removeEventListener('keydown', shiftHandler('down'));
      document.removeEventListener('keyup', shiftHandler('up'));
    };
  }, []);

  const [isOneDay, isWeekend, timeIndex] = useMemo(() => {
    const oneday = (
      new Date(value[0]).setHours(0, 0, 0, 0) === new Date(value[1]).setHours(0, 0, 0, 0)
    );
    if (!oneday) return [oneday, false, -1];

    const weekend = value[0].getDay() === 0 || value[0].getDay() === 6;
    const idx = (weekend ? time.weekend : time.weekday)
      .findIndex((e) => {
        // console.log(
        //   e.from.getTime() <= new Date(value[0]).setFullYear(1970, 0, 1),
        //   new Date(value[1]).setFullYear(1970, 0, 1) <= e.to.getTime(),
        // );
        // console.log(
        //   new Date(value[0]).setFullYear(1970, 0, 1),
        //   new Date(value[1]).setFullYear(1970, 0, 1),
        // );
        // console.log(
        //   e.from.getTime(),
        //   e.to.getTime(),
        // );
        const from = new Date(value[0]);
        const delta = from.getTime() - from.setFullYear(1970, 0, 1);
        const to = new Date(value[1].getTime() - delta);
        // console.log(from, delta, to);
        return (
          e.from.getTime() <= from.getTime()
            && to.getTime() <= e.to.getTime()
        );
      });

    return [oneday, weekend, idx];
  }, [value]);

  return (
    <Wrapper>
      <div>
        <DateButton onClick={() => setOpenCalendar(!openCalendar)}>
          {isOneDay
            ? dayjs(value[0]).format('YYYY-MM-DD')
            : `${dayjs(value[0]).format('YYYY-MM-DD')} ~ ${dayjs(value[1]).format('YYYY-MM-DD')}`}
        </DateButton>
        {openCalendar && (
          <Calendar
            selectRange={shift}
            value={value}
            onChange={(date) => {
              if (Array.isArray(date)) {
                onChange(date);
              } else {
                date.setHours(7, 0, 0, 0);
                onChange([date, date]);
              }
              setOpenCalendar(false);
            }}
            calendarType="US"
          />
        )}
      </div>
      {isOneDay && (
        <Select
          options={
            (isWeekend ? time.weekend : time.weekday)
              .map((e) => `${dayjs(e.from).format('HH:mm')}-${dayjs(e.to).format('HH:mm')} (${e.tag})`)
          }
          index={timeIndex}
          onChange={(idx) => {
            const selected = (isWeekend ? time.weekend : time.weekday)[idx];
            const from = new Date(value[0]);
            const delta = from.getTime() - from.setHours(selected.from.getHours(), selected.from.getMinutes(), 0, 0);
            const to = new Date(from.getTime() + selected.to.getTime() - selected.from.getTime());
            console.log(from, delta, to);
            // to.setHours(selected.to.getHours(), selected.to.getMinutes(), 0, 0);
            onChange([from, to]);
          }}
        />
      )}
    </Wrapper>
  );
};

export default DatetimeRangePicker;
