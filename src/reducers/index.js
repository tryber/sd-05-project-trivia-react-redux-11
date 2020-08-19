import { combineReducers } from 'redux';
import token from './token';
import questions from './questions';

export default combineReducers({
  token,
  questions,
});
