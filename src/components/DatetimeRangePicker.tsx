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

export default () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [range, setRange] = useState<Date | Date[]>(new Date());
  const [shift, setShift] = useState(false);
  const [timeIndex, setTimeindex] = useState(0);

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

  const dateRange = useMemo(() => {
    if (Array.isArray(range)) {
      return `${dayjs(range[0]).format('YYYY-MM-DD')} ~ ${dayjs(range[1]).format('YYYY-MM-DD')}`;
    }
    return dayjs(range).format('YYYY-MM-DD');
  }, [range]);

  return (
    <Wrapper>
      <div>
        <DateButton onClick={() => setOpenCalendar(!openCalendar)}>{dateRange}</DateButton>
        {openCalendar && (
          <Calendar
            selectRange={shift}
            value={range}
            onChange={(date) => {
              setRange(date);
              setOpenCalendar(false);
            }}
            calendarType="US"
          />
        )}
      </div>
      {Array.isArray(range) || (
        <Select options={time} index={timeIndex} onChange={(idx) => setTimeindex(idx) }/>
      )}
    </Wrapper>
  );
};
