import React from 'react';
import { Description, SubTitle } from 'src/components/Text';
import { marketTags } from 'src/data/tags';
import First, { FirstProps } from './First';
import WriteWrapper from '../WriteWrapper';
import Second, { SecondProps } from './Second';

interface WriteFoundData {
  first: FirstProps;
  second: SecondProps;
}

export default () => (
  <WriteWrapper
    stages={{
      first: First, second: Second,
    }}
    final={({ data }) => (
      <>
        <SubTitle>가격</SubTitle>
        {data.second.beforePrice && data.second.afterPrice && (
          <Description>
            {`₩${data.second.beforePrice}->₩${data.second.afterPrice} (${
              ((data.second.beforePrice - data.second.afterPrice) * 100)
                / data.second.beforePrice
            }%)`}
          </Description>
        )}
      </>
    )}
    title={<>디미 서점</>}
    initialData={{} as WriteFoundData}
    stageLabels={['기본 설정', '판매 설정']}
    boardName="book"
    tags={marketTags}
  />
);
