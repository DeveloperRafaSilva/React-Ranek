import React from 'react';
import style from './Pesquisar.module.css';
const Pesquisar = ({ setValue, onClick }) => {
  return (
    <>
      <div className={style.divInput}>
        <h1>👍 Compre ou Venda 👎</h1>
        <input
          className={style.pesquisar}
          id="pesquisar"
          placeholder="Pesquisar"
          onChange={({ target }) => setValue(target.value)}
          onBlur={onClick}
        />
      </div>
    </>
  );
};

export default Pesquisar;
