import styled from '@emotion/styled';
import React, { useState } from 'react';
import variables from '../styles/variables';

const Container = styled.div`
  width: 400px;
  padding: 30px;
  border: 1px solid ${variables.borderColor};
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
`;

const Calendar = styled.div`
  width: 300px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const Divider = styled.div`
  margin: 16px 0;
  border-bottom: 1px solid ${variables.borderColor};
`;

const CalendarDates = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 8px;
`;

const CalendarDay = styled.div`
  color: ${variables.gray};
  text-align: center;
`;

const CalendarDate = styled.div<{today: boolean, currentMonth: boolean}>`
  width: 30px;
  height: 30px;
  line-height: 28px;
  text-align: center;

  border: ${({ today }) => today && '2px solid red'};
  border-radius: ${({ today }) => today && '100%'};
  color: ${({ currentMonth }) => (currentMonth ? 'black' : variables.lightGray)};
`;

const ChangeButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
`;

const DatePicker: React.FC = () => {
  const [showingMonth, setShowingMonth] = useState(new Date());
  return (
    <Container>
      <ChangeButton>&#xE000;</ChangeButton>
      <Calendar>
        <Title>2020년 11월</Title>
        <Divider />
        <CalendarDates>
          {'일월화수목금토'.split('').map((day) => (<CalendarDay key={day}>{day}</CalendarDay>))}
          {[...Array(42)].map((_, date) => (<CalendarDate today={false} currentMonth={date < 31}>{date + 1}</CalendarDate>))}
        </CalendarDates>
      </Calendar>
      <ChangeButton>&#xE001;</ChangeButton>
    </Container>
  );
};

export default DatePicker;
