import { combineReducers } from 'redux';
import token from './token';
import questions from './questions';
import player from './player';

export default combineReducers({
  token,
  questions,
  player,
});
