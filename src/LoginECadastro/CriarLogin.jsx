import React from 'react';
import Login from './Login';
import style from './Login.module.css';
import CriarConta from './CriarConta';
import ButtonConta from '../Buttons/ButtonConta';
const CriarLogin = () => {
  const [modal, setModal] = React.useState(false);

  return (
    <div className={style.contaPagina}>
      <h1 className={style.tituloLogin}>Login</h1>
      <Login />
      {modal !== true && (
        <ButtonConta conteudo="Criar Conta" setEvent={() => setModal(!modal)} />
      )}
      {modal && <CriarConta />}
    </div>
  );
};

export default CriarLogin;
