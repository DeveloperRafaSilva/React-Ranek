import React from 'react';
import Inputs from '../Inputs/Form/Inputs';
import Style from './CriarConta.module.css';
import ButtonConta from '../Buttons/ButtonConta';
import UseFetch from '../UseFetch';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../useContext';

const CriarConta = () => {
  const navigate = useNavigate();
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [cep, setCep] = React.useState('');
  const [rua, setRua] = React.useState('');
  const [numero, setNumero] = React.useState('');
  const [bairro, setBairro] = React.useState('');
  const [cidade, setCidade] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const { request, loading, errorMessage, dados } = UseFetch();
  const { setUserName } = React.useContext(UserContext);

  async function criarUsuario() {
    const postUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      cep: cep,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
    };

    try {
      const resposta = await request(
        'https://ranekapi.origamid.dev/json/api/usuario',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(postUsuario),
        },
      );

      if (resposta) {
        const response = await request(
          'https://ranekapi.origamid.dev/json/jwt-auth/v1/token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: postUsuario.email,
              password: postUsuario.senha,
            }),
          },
        );
        navigate('/usuario');

        if (response && response.token) {
          setUserName(response.user_display_name);
          window.localStorage.setItem('idUsuario', response.user_email);
          window.localStorage.setItem('token', response.token);
          navigate('/usuario');
        }
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }

  return (
    <div className={Style.divForm}>
      <h1>Criar conta</h1>
      {errorMessage ? <p>{errorMessage}</p> : ''}
      <form className={Style.formCriar}>
        <Inputs
          tipo="text"
          id="nome"
          nome="nome"
          label="Nome"
          setValue={setNome}
        />
        <Inputs
          tipo="email"
          id="email"
          nome="email"
          label="Email"
          setValue={setEmail}
        />
        <Inputs
          tipo="password"
          id="senha"
          nome="senha"
          label="Senha"
          setValue={setSenha}
        />
        <Inputs
          tipo="number"
          id="cep"
          nome="cep"
          label="Cep"
          setValue={setCep}
        />
        <Inputs
          tipo="number"
          id="rua"
          nome="rua"
          label="Rua"
          setValue={setRua}
        />
        <Inputs
          tipo="number"
          id="numero"
          nome="numero"
          label="Numero"
          setValue={setNumero}
        />
        <Inputs
          tipo="number"
          id="bairro"
          nome="bairro"
          label="Bairro"
          setValue={setBairro}
        />
        <Inputs
          tipo="number"
          id="cidade"
          nome="cidade"
          label="cidade"
          setValue={setCidade}
        />
        <Inputs
          tipo="number"
          id="estado"
          nome="estado"
          label="Estado"
          setValue={setEstado}
        />
      </form>
      <ButtonConta
        setEvent={criarUsuario}
        conteudo={loading ? 'Carregando...' : 'Criar Usuário'}
      />
    </div>
  );
};

export default CriarConta;
