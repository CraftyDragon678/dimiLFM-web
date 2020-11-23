import React from 'react';
import { select } from '@storybook/addon-knobs';
import Input from './Input';

export default {
  title: 'Input',
  component: Input,
};

export const Simple = () => {
  const size = select('size', ['short', 'medium', 'long'], 'medium');
  return <Input width={size} />;
};
