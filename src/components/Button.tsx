import css from '@emotion/css';
import styled from '@emotion/styled';
import variables from '../styles/variables';

type TButtonSize = 'short' | 'medium' | 'long' | number;

interface IButton {
  size?: TButtonSize;
}

const getWidth = (size?: TButtonSize) => (
  !size || size === "medium" ? "100px"
    : size === "long" ? "140px"
      : size === "short" ? "70px"
        : `${size}px`
);

const buttonStyle = css`
  height: 40px;
  border: none;
  border-radius: 4px;
  padding: 0;
  background-color: ${variables.blue};
  color: white;
`;

export default styled.button<IButton>`
  ${buttonStyle}

  width: ${({ size }) => getWidth(size)};
`;
