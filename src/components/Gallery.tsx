import React from 'react';
import styled from '@emotion/styled';
import GalleryItem from './GalleryItem';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export default () => (
  <Grid>
    {[...Array(20)].map(() => (
      <GalleryItem
        image="https://via.placeholder.com/150"
        title="집가고싶다"
        author="리보솜"
      />
    ))}
  </Grid>
)
