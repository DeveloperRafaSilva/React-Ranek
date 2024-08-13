import React from 'react';
import Style from './Loading.module.css';
const Loading = () => {
  return (
    <div className={Style.carregando}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loading;
