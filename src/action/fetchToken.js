import getTokenApi from '../services/getTokenAPI';

export const RECEIVE_TOKEN_FAILURE = 'RECEIVE_TOKEN_FAILURE';
export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';


const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const receiveTokenFailure = (error) => ({
  type: RECEIVE_TOKEN_FAILURE,
  error,
});

const receiveTokenSuccess = (token) => ({
  type: RECEIVE_TOKEN_SUCCESS,
  token,
});

export function fetchToken() {
  return (dispatch) => {
    dispatch(requestToken());
    return getTokenApi()
      .then(
        (token) => dispatch(receiveTokenSuccess(token)),
        (error) => dispatch(receiveTokenFailure(error.message)),
      );
  };
}
