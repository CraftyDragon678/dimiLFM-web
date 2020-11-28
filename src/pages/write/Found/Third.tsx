import React from 'react';
import styled from '@emotion/styled';
import { getName } from 'src/data/map';
import DatetimeRangePicker from '../../../components/DatetimeRangePicker';
import { Description, SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';
import Map from '../../../components/Map';

export interface ThirdProps {
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

const Third: React.FC<WriteProps<ThirdProps>> = ({ verify, data, dataHandler }) => (
  <>
    <SubTitle>
      희망 장소
      {data.foundLocation && (
        <RoomName>
          {getName(data.foundLocation)}
        </RoomName>
      )}
    </SubTitle>
    <Description>
      물건 주인과 만나고 싶은 희망 장소를 선택해주세요!
      <br />
      최대 3순위까지 선택할 수 있습니다
      <br />
      물건을 직접 가지고 있지 않는 경우 아래 옵션을 선택해주세요
    </Description>
    <Map
      onClick={(ids) => {
        dataHandler({ ...data, foundLocation: ids[0] });
        verify(true);
      }}
      selected={data.foundLocation || ''}
    />
  </>
);

export default Third;
