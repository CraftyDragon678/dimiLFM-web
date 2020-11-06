import React from 'react';
import css from '@emotion/css';
import { keyframes } from '@emotion/core';
import { Button } from '../components/Button';

const Container = css`
  text-align: center;
`;

const AppLogoSpin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

const AppLogo = css`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${AppLogoSpin} infinite 20s linear;
  }
`;

const AppHeader = css`
  @media (prefers-reduced-motion: no-preference) {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }
`;

const AppLink = css`
  color: #61dafb;
`;

const Root: React.FC = () => {
  return (
    <div css={Container}>
      <Button>asdf</Button>
      <header css={AppHeader}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          css={AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Root;
