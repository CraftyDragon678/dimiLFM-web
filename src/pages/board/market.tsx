import React from 'react';
import { marketTags } from 'src/data/tags';
import NormalWrapper from './normalWrapper';

export default () => <NormalWrapper type="market" tags={[...marketTags]} />;
