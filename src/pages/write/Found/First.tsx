import React, { useState } from 'react';
import styled from '@emotion/styled';
import { getName } from 'src/utils/map';
import DatetimeRangePicker from '../../../components/DatetimeRangePicker';
import { SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';
import Map from '../../../components/Map';

export interface FirstProps {
  foundDate: Date;
  foundLocation: string;
}

const Divider = styled.div`
  height: 30px;
`;

const RoomName = styled.span`
  margin-left: 20px;
  color: black;
  font-size: 20px;
`;

const First: React.FC<WriteProps<FirstProps>> = ({ verify, data }) => {
  const [selectedRoom, setSelectedRoom] = useState<string>();
  return (
    <>
      <SubTitle>발견 일시</SubTitle>
      <DatetimeRangePicker />
      <Divider />
      <SubTitle>
        발견 장소
        {selectedRoom && (
          <RoomName>
            {getName(selectedRoom)}
          </RoomName>
        )}
      </SubTitle>
      <Map onClick={(ids) => setSelectedRoom(ids[0])} selected={selectedRoom || ''} />
    </>
  );
};

export default First;
