import React from 'react';
import Inputs from '../Inputs/Form/Inputs';
import style from './Login.module.css';
import ButtonConta from '../Buttons/ButtonConta';
import UseFetch from '../UseFetch';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../useContext';
import Head from '../Head';

const Login = () => {
  const { setUserName } = React.useContext(UserContext);
  const { setIdUsuario } = React.useContext(UserContext);

  const { dados, errorMessage, loading, request } = UseFetch();
  const navigate = useNavigate();
  const [senha, setSenha] = React.useState('');
  const [email, setEmail] = React.useState('');

  async function login() {
    const response = await request(
      'https://ranekapi.origamid.dev/json/jwt-auth/v1/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: senha }),
      },
    );

    if (response && response.token) {
      setUserName(response.user_display_name);
      window.localStorage.setItem('idUsuario', response.user_email);
      window.localStorage.setItem('token', response.token);
      navigate('/usuario');
    }
  }

  return (
    <div className={style.formConta}>
      <Head title="Ranek | Login" />
      <Inputs
        tipo="email"
        id="email"
        label="Email"
        value={email}
        setValue={setEmail}
      />
      <Inputs
        tipo="password"
        id="senha"
        label="senha"
        value={senha}
        setValue={setSenha}
      />
      <ButtonConta
        setEvent={login}
        className={style.btnLogin}
        conteudo={loading ? 'Carregando...' : 'Logar'}
      />
      {errorMessage ? (
        <p style={{ textAlign: 'center', color: '#e80' }}>{errorMessage}</p>
      ) : (
        ''
      )}
      <a href="#">Perdeu a senha?</a>
    </div>
  );
};

export default Login;
