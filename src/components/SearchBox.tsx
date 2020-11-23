import React, { useState } from 'react';
import styled from '@emotion/styled';
import variables from '../styles/variables';
import loupe from '../assets/images/loupe.svg';

const Container = styled.div`
  width: 560px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  height: 60px;
  width: 560px;

  box-sizing: border-box;
  padding: 16px;
  padding-right: 56px;
  font-size: 24px;
  border-radius: 12px;
  border: 1px solid ${variables.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;

  outline: none;

  :focus {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, .2);
  }

  ::placeholder {
    text-align: center;
    color: ${variables.gray};
  }
`;

const SearchButton = styled.img`
  height: 32px;
  width: 32px;
  margin-left: -48px;
`;

export default () => {
  const [query, setQuery] = useState('');

  return (
    <Container>
      <Input
        placeholder="분실물, 판매글 등을 검색해보세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton src={loupe} />
    </Container>
  );
};
