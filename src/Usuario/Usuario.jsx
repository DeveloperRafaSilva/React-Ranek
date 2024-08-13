import React from 'react';
import Style from './Usuario.module.css';
import Inputs from '../Inputs/Form/Inputs';
import Buttons from '../Buttons/BotaoCompras';
import UseFetch from '../UseFetch';
import Loading from '../loading/Loading';

const Usuario = () => {
  const { dados, errorMessage, loading, request } = UseFetch();
  const [postResposta, setPostResposta] = React.useState();
  const [produtoUsuario, setProdutoUsuario] = React.useState([]);
  const [nome, setNome] = React.useState('');
  const [preco, setPreco] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [file, setFile] = React.useState(null);

  async function postar(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('descricao', descricao);
    formData.append('fotos', file);

    const response = await request(
      'https://ranekapi.origamid.dev/json/api/produto',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        body: formData,
      },
    );

    if (response) setPostResposta(response);
  }
  React.useEffect(() => {
    async function usuarioProduto() {
      const response = await request(
        `https://ranekapi.origamid.dev/json/api/produto?usuario_id=${window.localStorage.getItem(
          'idUsuario',
        )}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        },
      );
      if (response) setProdutoUsuario(response);
      console.log(response);
    }
    usuarioProduto();
  }, [request]);

  async function excluirProduto(produto) {
    if (produto) {
      const response = await request(
        `https://ranekapi.origamid.dev/json/api/produto/${produto.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        },
      );
    }
  }

  React.useEffect(() => {
    excluirProduto();
  }, [request]);

  console.log(produtoUsuario);
  return (
    <div className={Style.conta}>
      <div className={Style.postarProduto}>
        <h2>Adicionar Produto</h2>
        <form onSubmit={postar}>
          <Inputs
            tipo="text"
            label="Nome"
            id="nome"
            name="nome"
            setValue={setNome}
          />
          <Inputs
            tipo="text"
            label="Preco"
            id="preco"
            name="preco"
            setValue={setPreco}
          />
          <Inputs
            tipo="file"
            label="Fotos"
            id="fotos"
            name="fotos"
            onChange={(event) => setFile(event.target.files[0])}
          />
          <label htmlFor="area">Descrição</label>
          <textarea
            name="area"
            id="area"
            width="500px"
            onChange={({ target }) => setDescricao(target.value)}
          ></textarea>
          <Buttons content="Postar Produto" setEvent={postar} />
        </form>
      </div>
      <h2>Meus Produtos</h2>
      {loading && <p>{<Loading />}</p>}
      {produtoUsuario.map((produto) => (
        <div key={produto.id} className={Style.containerProduto}>
          <img src={produto.fotos ? produto.fotos[0].src : ''} alt="" />
          <div>
            <p>{produto.preco}</p>
            <h2>{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <button
              className={Style.btnDeletar}
              onClick={() => excluirProduto(produto)}
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Usuario;
