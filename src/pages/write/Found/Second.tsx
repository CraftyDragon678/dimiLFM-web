import React from 'react';
import styled from '@emotion/styled';
import { getName } from 'src/data/map';
import Radio from 'src/components/Radio';
import { Description, SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';
import Map from '../../../components/Map';

export interface SecondProps {
  radioIndex: number;
  wantLocation?: string;
}

const RoomName = styled.span`
  margin-left: 20px;
  color: black;
  font-size: 20px;
`;

const Third: React.FC<WriteProps<SecondProps>> = ({ verify, data, dataHandler }) => (
  <>
    <SubTitle>
      희망 장소
      {data.radioIndex !== 0 && data.wantLocation && (
        <RoomName>
          {getName(data.wantLocation)}
        </RoomName>
      )}
    </SubTitle>
    <Description>
      물건 주인과 만나고 싶은 희망 장소를 선택해주세요!
      <br />
      물건을 직접 가지고 있지 않는 경우 아래 옵션을 선택해주세요
    </Description>
    <Radio
      value={data.radioIndex}
      names={[
        '저한테 없습니다 - 발견 장소에 그대로 두었습니다',
        '저한테 없습니다 - 다른 곳에 맡겼습니다 (맡긴 장소를 선택해주세요)',
        '저한테 있습니다 (만나고 싶은 장소를 선택해주세요)',
      ]}
      onChange={(idx) => {
        dataHandler({ ...data, radioIndex: idx });
        verify(!!data.wantLocation || idx === 0);
      }}
    />
    {(data.radioIndex === 1 || data.radioIndex === 2) && (
      <Map
        onClick={(ids) => {
          dataHandler({ ...data, wantLocation: ids[0] });
          verify(true);
        }}
        selected={data.wantLocation || ''}
      />
    )}
  </>
);

export default Third;
