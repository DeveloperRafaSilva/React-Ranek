import React from 'react';
const BotaoCompras = ({ content, setEvent }) => {
  return (
    <button onClick={setEvent}>{content ? content : 'Finalizar Compra'}</button>
  );
};

export default BotaoCompras;
