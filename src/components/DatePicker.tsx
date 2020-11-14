import styled from '@emotion/styled';
import React from 'react';
import variables from '../styles/variables';

const Container = styled.div`
  margin: 50px;
  width: 600px;
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

const Dates = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 8px;
`;

const Day = styled.div`
  color: ${variables.gray};
  text-align: center;
`;

const Date = styled.div<{today?: boolean}>`
  width: 30px;
  height: 30px;
  line-height: 28px;
  text-align: center;

  border: ${({ today }) => today && "2px solid red"};
  border-radius: ${({ today }) => today && "100%"};
`;

const DatePicker: React.FC = () => {
  return (
    <Container>
      <Calendar>
        <Title>2020년 11월</Title>
        <Divider />
        <Dates>
          {"일월화수목금토".split("").map((day) => (<Day>{day}</Day>))}
          {[...Array(31)].map((_, date) => (<Date>{date+1}</Date>))}
        </Dates>
      </Calendar>
    </Container>
  );
};

export default DatePicker;
