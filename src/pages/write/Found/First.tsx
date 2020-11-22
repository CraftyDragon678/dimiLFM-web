import React from 'react';
import { SubTitle } from '../../../components/Text';
import { WriteProps } from "../../../types/write";

export interface FirstProps {
  foundDate: Date;
  foundLocation: string;
}

const First: React.FC<WriteProps<FirstProps>> = ({ verify, data }) => {
  return (
    <>
      <SubTitle>
        발견 일시
      </SubTitle>
    </>
  );
};

export default First;
