import React from 'react';
import styled from '@emotion/styled';
import { getName } from 'src/data/map';
import DatetimeRangePicker from '../../../components/DatetimeRangePicker';
import { SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';
import Map from '../../../components/Map';

export interface FirstProps {
  lostDate: Date[];
  lostLocation: string | undefined;
}

const Divider = styled.div`
  height: 30px;
`;

const RoomName = styled.span`
  margin-left: 20px;
  color: black;
  font-size: 20px;
`;

const First: React.FC<WriteProps<FirstProps>> = ({ verify, data, dataHandler }) => (
  <>
    <SubTitle>분실 일시</SubTitle>
    <DatetimeRangePicker
      value={data.lostDate}
      onChange={(newrange) => dataHandler({ ...data, lostDate: newrange })}
    />
    <Divider />
    <SubTitle>
      분실 장소
      {data.lostLocation && (
        <RoomName>
          {getName(data.lostLocation)}
        </RoomName>
      )}
    </SubTitle>
    <Map
      onClick={(ids) => {
        dataHandler({ ...data, lostLocation: ids[0] });
        verify(true);
      }}
      selected={data.lostLocation || ''}
    />
  </>
);

export default First;
