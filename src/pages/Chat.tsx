import React from 'react';
import api from '../api';

export default () => {
  const sendMessage = () => {

  }

  return (
    <div>
      <input onKeyUp={(e) => e.key === 'Enter'}></input>
    </div>
  );
};
