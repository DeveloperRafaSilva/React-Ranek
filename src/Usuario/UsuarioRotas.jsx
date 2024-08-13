import React from 'react';
import Style from './Usuario.module.css';
import { Outlet, NavLink } from 'react-router-dom';
import Head from '../Head';

const UsuarioRotas = () => {
  return (
    <div className={Style.DivUsuario}>
      <Head title="Ranek | Conta" />
      <nav className={Style.nav}>
        <NavLink
          exact
          className={({ isActive }) => (isActive ? Style.active : '')}
          to=""
          end
        >
          <button className={Style.button}>Produtos</button>
        </NavLink>
        <NavLink
          to="compras"
          end
          className={({ isActive }) => (isActive ? Style.active : '')}
        >
          <button className={Style.button}>Compras</button>
        </NavLink>
        <NavLink
          to="vendas"
          end
          className={({ isActive }) => (isActive ? Style.active : '')}
        >
          <button className={Style.button}>Vendas</button>
        </NavLink>
        <NavLink
          to="editar"
          end
          className={({ isActive }) => (isActive ? Style.active : '')}
        >
          <button className={Style.button}>Editar Usuário</button>
        </NavLink>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? Style.active : '')}
        >
          <button
            onClick={() => window.localStorage.removeItem('token')}
            className={Style.button}
          >
            Logout
          </button>
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default UsuarioRotas;
