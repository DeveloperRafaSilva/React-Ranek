import React from 'react';

const UseFetch = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [dados, setDados] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    try {
      setLoading(true);
      setErrorMessage(null);
      response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) throw new Error(json.message);
      setDados(json);
      return json;
    } catch (err) {
      setErrorMessage(err.message);
      setDados(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    request,
    errorMessage,
    dados,
  };
};

export default UseFetch;
