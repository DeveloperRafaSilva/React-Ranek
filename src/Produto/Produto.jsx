import React from 'react';
import Style from './Produto.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import UseFetch from '../UseFetch';
import Inputs from '../Inputs/Form/Inputs';
import BotaoCompras from '../Buttons/BotaoCompras';
import Head from '../Head';

const Produto = () => {
  const { id } = useParams();
  const { dados, loading, errorMessage, request } = UseFetch();
  const [produto, setProdutos] = React.useState(null);
  const [compra, setCompra] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function produtoItem() {
      const resposta = await request(
        `https://ranekapi.origamid.dev/json/api/produto/${id}`,
      );
      if (resposta) {
        setProdutos(resposta);
      }
    }
    produtoItem();
  }, []);

  const [modal, setModal] = React.useState(false);
  const [dadosForm, setDadosForm] = React.useState();
  React.useEffect(() => {
    async function fetchUsuario() {
      const resposta = await fetch(
        `https://ranekapi.origamid.dev/json/api/usuario`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        },
      );
      const dadosUsuario = await resposta.json();
      setDadosForm(dadosUsuario);
    }

    fetchUsuario();
  }, []);

  async function Comprar(produto) {
    event.preventDefault();
    const resposta = await fetch(
      `https://ranekapi.origamid.dev/json/api/transacao`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          comprador_id: dadosForm.email,
          vendedor_id: produto.usuario_id,
          endereco: dadosForm,
          produto: produto,
        }),
      },
    );
    if (resposta.ok) navigate('/usuario/compras');
    const json = await resposta.json();
    setCompra(json);
  }

  if (loading) return <p>Carregando</p>;
  if (produto === null) return null;
  return (
    <>
      <Head title={`Ranek | ${produto.id}`} />
      <div className={Style.divProdutoItem}>
        <div>
          {produto.fotos &&
            produto.fotos.map((imagem, index) => (
              <img key={index} src={imagem.src} alt="" />
            ))}
        </div>
        <div className={Style.conteudoProdutos}>
          <h1>{produto.nome ? produto.nome : ''}</h1>
          <h2 className={Style.preco}>{produto.preco}</h2>
          <p className={Style.descricao}>{produto.descricao}</p>
          <div className={Style.btnComprar}>
            {!modal && <button onClick={() => setModal(true)}>Comprar</button>}
          </div>
          {modal && (
            <div className={Style.divProduto}>
              <h1 className={Style.tituloForm}>Endereço de envio</h1>
              <form action="POST">
                <Inputs
                  label="Nome"
                  tipo="text"
                  id="nome"
                  nome="nome"
                  setValue={(nome) => setDadosForm(...dadosForm, nome)}
                  value={dadosForm.nome}
                />
                <Inputs
                  label="Email"
                  tipo="email"
                  id="email"
                  nome="email"
                  value={dadosForm.email}
                  setValue={(email) => setDadosForm(...dadosForm, email)}
                />
                <Inputs
                  label="Senha"
                  tipo="password"
                  id="senha"
                  nome="senha"
                  value={dadosForm.senha}
                  setValue={(senha) => setDadosForm(...dadosForm, senha)}
                />
                <Inputs
                  label="Cep"
                  tipo="number"
                  id="cep"
                  nome="cep"
                  value={dadosForm.cep}
                  setValue={(cep) => setDadosForm(...dadosForm, cep)}
                />
                <Inputs
                  label="Rua"
                  tipo="number"
                  id="rua"
                  nome="rua"
                  value={dadosForm.rua}
                  setValue={(rua) => setDadosForm(...dadosForm, rua)}
                />
                <Inputs
                  label="Numero"
                  tipo="number"
                  id="numero"
                  nome="numero"
                  value={dadosForm.numero}
                  setValue={(numero) => setDadosForm(...dadosForm, numero)}
                />
                <Inputs
                  label="Bairro"
                  tipo="number"
                  id="cidade"
                  nome="cidade"
                  value={dadosForm.cidade}
                  setValue={(cidade) => setDadosForm(...dadosForm, cidade)}
                />
                <Inputs
                  label="Estado"
                  tipo="number"
                  id="estado"
                  nome="estado"
                  value={dadosForm.estado}
                  setValue={(estado) => setDadosForm(...dadosForm, estado)}
                />
                <BotaoCompras setEvent={() => Comprar(produto)} />
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Produto;
