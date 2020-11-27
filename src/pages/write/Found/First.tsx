import React from 'react';
import styled from '@emotion/styled';
import { getName } from 'src/data/map';
import DatetimeRangePicker from '../../../components/DatetimeRangePicker';
import { SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';
import Map from '../../../components/Map';

export interface FirstProps {
  foundDate: Date[];
  foundLocation: string | undefined;
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
    <SubTitle>발견 일시</SubTitle>
    <DatetimeRangePicker
      value={data.foundDate}
      onChange={(newrange) => dataHandler({ ...data, foundDate: newrange })}
    />
    <Divider />
    <SubTitle>
      발견 장소
      {data.foundLocation && (
        <RoomName>
          {getName(data.foundLocation)}
        </RoomName>
      )}
    </SubTitle>
    <Map
      onClick={(ids) => {
        dataHandler({ ...data, foundLocation: ids[0] });
        verify(true);
      }}
      selected={data.foundLocation || ''}
    />
  </>
);

export default First;
