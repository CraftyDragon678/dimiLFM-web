import React from 'react';
import styled from '@emotion/styled';
import DatetimeRangePicker from '../../../components/DatetimeRangePicker';
import { SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';

export interface FirstProps {
  foundDate: Date;
  foundLocation: string;
}

const Divider = styled.div`
  height: 50px;
`;

const First: React.FC<WriteProps<FirstProps>> = ({ verify, data }) => (
  <>
    <SubTitle>발견 일시</SubTitle>
    <DatetimeRangePicker />
    <Divider />
    <SubTitle>발견 장소</SubTitle>
  </>
);

export default First;
