import React from 'react';
import Inputs from '../Inputs/Form/Inputs';
import Style from './Usuario.module.css';
import Button from '../Buttons/BotaoCompras';
import UseFetch from '../UseFetch';

const EditarUsuario = () => {
  const { request, dados, errorMessage, loading } = UseFetch();
  const [dadosUser, setDadosUser] = React.useState({
    nome: '',
    email: '',
    senha: '',
    cep: '',
    rua: '',
    Numero: '',
    Bairro: '',
    cidade: '',
    estado: '',
  });

  React.useEffect(() => {
    async function fetchData() {
      const response = await request(
        'https://ranekapi.origamid.dev/json/api/usuario',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        },
      );
      if (response) {
        setDadosUser(response);
      }
    }

    fetchData();
  }, []);

  async function AtualizarUsuario() {
    const response = await request(
      'https://ranekapi.origamid.dev/json/api/usuario',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        body: JSON.stringify(dadosUser),
      },
    );
    if (response) {
      setDadosUser(response);
    }
  }

  if (dadosUser)
    return (
      <div>
        <form className={Style.formEdit}>
          <Inputs
            tipo="text"
            id="nome"
            label="Nome"
            nome="nome"
            value={dadosUser.nome}
            setValue={(nome) => setDadosUser({ ...dadosUser, nome })}
          />
          <Inputs
            tipo="email"
            id="email"
            label="Email"
            nome="email"
            value={dadosUser.email}
            setValue={(email) => setDadosUser({ ...dadosUser, email })}
          />
          <Inputs
            tipo="password"
            id="senha"
            label="Senha"
            nome="senha"
            value={dadosUser.senha}
            setValue={(senha) => setDadosUser({ ...dadosUser, senha })}
          />
          <Inputs
            tipo="number"
            id="cep"
            label="Cep"
            nome="cep"
            value={dadosUser.cep}
            setValue={(cep) => setDadosUser({ ...dadosUser, cep })}
          />
          <Inputs
            tipo="text"
            id="rua"
            label="Rua"
            nome="rua"
            value={dadosUser.rua}
            setValue={(rua) => setDadosUser({ ...dadosUser, rua })}
          />
          <Inputs
            tipo="text"
            id="Numero"
            label="Numero"
            nome="Numero"
            value={dadosUser.Numero}
            setValue={(Numero) => setDadosUser({ ...dadosUser, Numero })}
          />
          <Inputs
            tipo="text"
            id="Bairro"
            label="Bairro"
            nome="Bairro"
            value={dadosUser.Bairro}
            setValue={(Bairro) => setDadosUser({ ...dadosUser, Bairro })}
          />
          <Inputs
            tipo="text"
            id="cidade"
            label="Cidade"
            nome="cidade"
            value={dadosUser.cidade}
            setValue={(cidade) => setDadosUser({ ...dadosUser, cidade })}
          />
          <Inputs
            tipo="text"
            id="estado"
            label="Estado"
            nome="estado"
            value={dadosUser.estado}
            setValue={(estado) => setDadosUser({ ...dadosUser, estado })}
          />
          {errorMessage && <p>{errorMessage}</p>}
        </form>
        <div className={Style.btnEditar}>
          <Button setEvent={AtualizarUsuario} content="Atualizar Usuário" />
        </div>
      </div>
    );
};

export default EditarUsuario;
