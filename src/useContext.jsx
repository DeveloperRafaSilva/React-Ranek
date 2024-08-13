import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [idUsuario, setIdUsuario] = useState('rafael');

  return (
    <UserContext.Provider
      value={{ userName, setUserName, idUsuario, setIdUsuario }}
    >
      {children}
    </UserContext.Provider>
  );
};
