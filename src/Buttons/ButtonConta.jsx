import React from 'react';
import Style from './ButtonConta.module.css';
const ButtonConta = ({ conteudo, setEvent }) => {
  return (
    <>
      <div className={Style.btn}>
        <button onClick={setEvent} className={Style.btnLogin}>
          {conteudo}
        </button>
      </div>
    </>
  );
};

export default ButtonConta;
