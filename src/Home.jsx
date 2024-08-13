import React from 'react';
import style from './Home.module.css';
import Pesquisar from './Inputs/Pesquisar';
import UseFetch from './UseFetch';
import Produtos from './Produtos/Produtos';
import { UserProvider } from './useContext';
import Head from './Head';
import Loading from './loading/Loading';
const Home = () => {
  const [pesquisa, setPesquisa] = React.useState('');
  const { dados, loading, errorMessage, request } = UseFetch();
  const [produto, setProdutos] = React.useState([]);

  const itemPorPagina = 6;
  const [pagina, setPagina] = React.useState(6);
  React.useEffect(() => {
    if (pesquisa.length === 0) {
      const response = request(
        'https://ranekapi.origamid.dev/json/api/produto',
      );
    }
    console.log(produto);
  }, [request, pesquisa.length]);

  React.useEffect(() => {
    if (dados) {
      setProdutos(dados);
      setPagina(1);
    }
  }, [dados]);

  function pesquisar() {
    request(`https://ranekapi.origamid.dev/json/api/produto/?q=${pesquisa}`);
  }

  const produtosPorPagina = pagina * itemPorPagina;
  const paginacao = produtosPorPagina - itemPorPagina;

  const produtoExibidos = produto.slice(paginacao, produtosPorPagina);

  const numeroTotalDePaginas = Math.ceil(produto.length / produtosPorPagina);

  const navegacao = (page) => {
    if (page > 0 && page <= numeroTotalDePaginas) {
      setPagina(page);
    }
  };

  if (errorMessage)
    return (
      <p style={{ textAlign: 'center', margin: '2rem' }}>{errorMessage}</p>
    );

  return (
    <UserProvider>
      <Head title="Ranek | Produtos" />
      <div className={style.home}>
        <Pesquisar
          setValue={setPesquisa}
          value={pesquisa}
          onClick={pesquisar}
        />
        {loading && (
          <p>
            <Loading />
          </p>
        )}
        {produto && <Produtos produto={produtoExibidos} key={produto.id} />}
      </div>
      <div className={style.navegacao}>
        <p className={style.navItem} onClick={() => navegacao(pagina - 1)}>
          Anterior
        </p>
        <p className={style.navItem} onClick={() => navegacao(pagina + 1)}>
          Próxima
        </p>
      </div>
    </UserProvider>
  );
};

export default Home;
