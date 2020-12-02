import React from 'react';
import { RouteComponentProps } from 'react-router';

export default ({ match }: RouteComponentProps<{query: string}>) => {
  const query = match.params.query;
  return (
    null
  );
};
