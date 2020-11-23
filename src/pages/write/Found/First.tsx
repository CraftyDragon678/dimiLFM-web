import React from 'react';
import DatePicker from '../../../components/DatePicker';
import { SubTitle } from '../../../components/Text';
import { WriteProps } from '../../../types/write';

export interface FirstProps {
  foundDate: Date;
  foundLocation: string;
}

const First: React.FC<WriteProps<FirstProps>> = ({ verify, data }) => (
  <>
    <SubTitle>발견 일시</SubTitle>
    <DatePicker />
    <SubTitle>발견 장소</SubTitle>
  </>
);

export default First;
