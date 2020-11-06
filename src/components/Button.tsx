import React from 'react'
import css from '@emotion/css';
import variables from "../scss/_variables.scss";

const style = {
  btn: css`
    height: 35px;
    padding: 0 20px;
    border: 0;
    background: ${variables.yellow};
  `,
}

export const Button: React.FC = ({ children }) => {
  console.log(style.btn);
  return (
    <button css={style.btn}>
      {children}
    </button>
  )
}
