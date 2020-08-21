import { LOAD_PLAYER } from '../action/loadPlayer';
import { ADD_SCORE } from '../action/addScore';

const INITIAL_STATE = {
  name: '',
  hash: '',
  score: 0,
  assertions: 0,
  gravatarEmail: '',
  logged: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PLAYER:
      return {
        ...state,
        name: action.name,
        hash: action.hash,
        gravatarEmail: action.email,
      };
    case ADD_SCORE:
      return {
        ...state,
        score: state.score + action.score,
        assertions: state.assertions + 1,
      };
    default:
      return state;
  }
};

export default player;
