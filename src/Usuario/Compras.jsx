import React from 'react';
import Usefetch from '../UseFetch';
import Style from './Compras.module.css';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';
const Compras = () => {
  const { request, loading, errorMessage, dados } = Usefetch();
  const [dadosCompras, setDadosCompras] = React.useState([]);
  async function pegarCompras() {
    const response = await request(
      'https://ranekapi.origamid.dev/json/api/transacao?tipo=comprador_id',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      },
    );
    if (response) setDadosCompras(response);
  }

  React.useEffect(() => {
    pegarCompras();
  }, []);

  if (dadosCompras)
    return (
      <div>
        <h1 className={Style.tituloCompras}>Compras</h1>
        <div>
          {loading && <p>{<Loading />}</p>}
          {dadosCompras.map((produto, index) => (
            <div key={index} className={Style.produtosComprados}>
              <div className={Style.imagemCompra}>
                <Link to={`/produto/${produto.produto.id}`}>
                  <img
                    src={
                      produto.produto.fotos ? produto.produto.fotos[0].src : ''
                    }
                  />
                </Link>
              </div>
              <div className="conteudo-prodtuos">
                <p>{produto.produto.preco ? produto.produto.preco : ''}</p>
                <h2>{produto.produto.nome ? produto.produto.nome : ''}</h2>
                <p>
                  <span style={{ color: '#e80' }}>Vendedor </span>
                  {produto.vendedor_id ? produto.vendedor_id : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Compras;
