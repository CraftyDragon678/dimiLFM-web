import React from 'react';
import { Description, SubTitle } from 'src/components/Text';
import { marketTags } from 'src/data/tags';
import First, { FirstProps } from './First';
import WriteWrapper from '../WriteWrapper';

interface WriteFoundData {
  first: FirstProps;
}

export default () => (
  <WriteWrapper
    stages={{
      first: First,
    }}
    final={({ data }) => (
      <>
        <SubTitle>가격</SubTitle>
        {data.first.beforePrice && data.first.afterPrice && (
          <Description>
            {`₩${data.first.beforePrice}->₩${data.first.afterPrice} (${
              ((data.first.beforePrice - data.first.afterPrice) * 100)
                / data.first.beforePrice
            }%)`}
          </Description>
        )}
      </>
    )}
    title={<>판매합니다</>}
    initialData={{
      first: {
        stars: 0,
      },
    } as WriteFoundData}
    stageLabels={['판매 설정']}
    boardName="market"
    tags={marketTags}
  />
);
