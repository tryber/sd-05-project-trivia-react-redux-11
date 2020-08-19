import {
  RECEIVE_TOKEN_FAILURE,
  RECEIVE_TOKEN_SUCCESS,
  REQUEST_TOKEN,
} from '../action/fetchToken';

const INITIAL_STATE = {
  isFetching: false,
  token: {},
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_TOKEN:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token,
        isFetching: false,
      };
    case RECEIVE_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default token;
