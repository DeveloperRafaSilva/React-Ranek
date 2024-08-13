import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home';
import Produto from './Produto/Produto';
import CriarLogin from './LoginECadastro/CriarLogin';
import Usuario from './Usuario/Usuario';
import Compras from './Usuario/Compras';
import UsuarioRotas from './Usuario/UsuarioRotas';
import Vendas from './Usuario/Vendas';
import EditarUsuario from './Usuario/EditarUsuario';
import { UserProvider } from './useContext';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="produto/:id" element={<Produto />} />
            <Route path="criar&Login" element={<CriarLogin />} />
            <Route path="usuario/*" element={<UsuarioRotas />}>
              <Route path="" Component={Usuario} />
              <Route path="compras" Component={Compras} />
              <Route path="vendas" Component={Vendas} />
              <Route path="editar" Component={EditarUsuario} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
