import { LOAD_PLAYER }from '../action/loadPlayer';
import { ADD_SCORE } from '../action/addScore';

const INITIAL_STATE = {
  name: '',
  profilePicture: '',
  score: 0,
  logged: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PLAYER:
      return {
        ...state,
        name: action.name,
        profilePicture: action.picture,
      };
    case ADD_SCORE:
      return {
        ...state,
        score: state.player.score + action.score,
      };
    default:
      return state;
  }
};

export default player;
