import React from 'react';
import { normalTags } from 'src/data/tags';
import NormalWrapper from './normalWrapper';

export default () => <NormalWrapper type="market" tags={[...normalTags]} />;
