import React from 'react';
import style from './Produto.module.css';
import { Link } from 'react-router-dom';

const Produtos = ({ produto }) => {
  if (produto)
    return (
      <main className={style.mainProduto}>
        {produto.map((produto) => (
          <Link key={produto.id} to={`produto/${produto.id}`}>
            <div className={style.cardProduto}>
              <img src={produto.fotos ? produto.fotos[0].src : ''} alt="" />
              <p className={style.preco}>
                {produto.preco ? produto.preco : '00,00'}
              </p>
              <h2>{produto.nome ? produto.nome : ''}</h2>
              <p>{produto.descricao ? produto.descricao : ''}</p>
            </div>
          </Link>
        ))}
      </main>
    );
};

export default Produtos;
