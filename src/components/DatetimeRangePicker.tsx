import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import ReactCalendar from 'react-calendar';
import dayjs from 'dayjs';
import css from '@emotion/css';
import variables from '../styles/variables';

const Wrapper = styled.div`
  margin: 16px;
  display: grid;
  grid-template-columns: 350px 200px;
`;

const buttonStyle = css`
  height: 30px;
  border: 1px solid ${variables.borderColor};
  padding: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  display: inline-block;
  user-select: none;
  text-align: center;
`;

const DateButton = styled.div`
  width: 300px;
  ${buttonStyle}
`;

const Calendar = styled(ReactCalendar)`
  position: absolute;
  margin-top: 16px;
`;

const TimeButton = styled.label`
  width: 300px;
  ${buttonStyle}
`;

const Select = styled.select`
  width: 300px;
  height: 30px;
  position: relative;
  top: -30px;
  opacity: 0;
`;

export default () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [range, setRange] = useState<Date | Date[]>(new Date());
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
      <div>
        <TimeButton>test</TimeButton>
        <Select>
          <option>A</option>
          <option>A</option>
          <option>A</option>
          <option>A</option>
          <option>A</option>
          <option>A</option>
        </Select>
      </div>
    </Wrapper>
  );
};
