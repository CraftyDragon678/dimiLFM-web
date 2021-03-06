import React from 'react';
import styled from '@emotion/styled';
import history from 'src/router/history';
import variables from 'src/styles/variables';
import GalleryItem from './GalleryItem';

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: center;
  column-gap: 10px;
  row-gap: 20px;
  place-items: center;
  padding: 16px 0;

  ${variables.mq[0]} {
    grid-template-columns: repeat(auto-fill, 150px);
  }
`;

interface GalleryProps {
  data: {
    done: boolean;
    href: string;
    image: string;
    title: string;
    subtitle: string;
  }[];
}

const Gallery: React.FC<GalleryProps> = ({ data }) => (
  <Grid>
    {data.map((e) => (
      <GalleryItem
        done={e.done}
        key={e.href}
        image={e.image}
        title={e.title}
        subtitle={e.subtitle}
        onClick={() => history.push(e.href)}
      />
    ))}
  </Grid>
);

export default Gallery;
