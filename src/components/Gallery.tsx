import React from 'react';
import styled from '@emotion/styled';
import GalleryItem from './GalleryItem';

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  background-color: white;
  padding: 16px 0;
`;

export default () => (
  <Grid>
    {[...Array(20)].map(() => (
      <GalleryItem
        image="https://via.placeholder.com/200"
        title="집가고싶다"
        author="리보솜"
      />
    ))}
  </Grid>
);
