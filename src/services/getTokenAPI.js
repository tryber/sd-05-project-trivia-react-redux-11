const getTokenAPI = (token) => (
  fetch(`https://opentdb.com/api_token.php?command=request`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getTokenAPI;
