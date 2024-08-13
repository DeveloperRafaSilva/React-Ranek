import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { UserContext } from '../useContext';
const Header = () => {
  const { userName } = React.useContext(UserContext);
  return (
    <header>
      <nav>
        <NavLink to="/" end>
          <h1 className={styles.logo}>Ranek</h1>
        </NavLink>
        {userName !== '' && (
          <NavLink to="usuario" end>
            <button className={styles.logo}>{userName}</button>
          </NavLink>
        )}
        {userName === '' && (
          <NavLink to="criar&Login" end>
            <button className={styles.logo}>Vender / Logar</button>
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
