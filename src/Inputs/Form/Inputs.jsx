import React from 'react';
import Style from './Inputs.module.css';

const Inputs = ({ label, tipo, id, nome, setValue, value, onChange }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        className={Style.input}
        type={tipo}
        name={nome}
        id={id}
        value={tipo !== 'file' ? value : undefined}
        onChange={
          tipo === 'file' ? onChange : ({ target }) => setValue(target.value)
        }
      />
    </>
  );
};

export default Inputs;
