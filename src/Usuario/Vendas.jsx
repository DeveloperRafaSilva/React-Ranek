import React from 'react';
import UseFetch from '../UseFetch';
import style from './Vendas.module.css';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';
const Vendas = () => {
  const { request, loading, errorMessage, dados } = UseFetch();
  const [dadosVendas, setDadosVendas] = React.useState([]);
  async function pegarCompras() {
    const response = await request(
      'https://ranekapi.origamid.dev/json/api/transacao?tipo=vendedor_id',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      },
    );
    if (response) setDadosVendas(response);
  }

  React.useEffect(() => {
    pegarCompras();
  }, [request]);

  if (dadosVendas)
    return (
      <div>
        <h1 className={style.tituloVendas}>Vendas</h1>
        {loading && <p>{<Loading />}</p>}
        {dadosVendas.map((produto, index) => (
          <div key={index} className={style.gridVendas}>
            <Link to={`produto/${produto.id}`}>
              <div className={style.imagemVenda}>
                <img src={produto.produto.fotos[0].src} alt="" />
              </div>
            </Link>
            <div className={style.conteudo}>
              <p>
                {produto.produto.preco === '' ? '00,00' : produto.produto.preco}
              </p>
              <h2>{produto.produto.nome}</h2>
              <p>
                <span style={{ color: '#e80' }}>Comprador: </span>
                {produto.comprador_id}
              </p>
            </div>
            <div className={style.Entrega}>
              <h2>Entrega</h2>
            </div>
            <div className={style.DadosDestinatario}>
              <p>bairro:{produto.endereco.bairro}</p>
              <p>cep:{produto.endereco.cep}</p>
              <p>cidade:{produto.endereco.cidade}</p>
              <p>estado:{produto.endereco.estado}</p>
              <p>numero:{produto.endereco.numero}</p>
              <p>rua:{produto.endereco.rua}</p>
            </div>
          </div>
        ))}
      </div>
    );
};

export default Vendas;
