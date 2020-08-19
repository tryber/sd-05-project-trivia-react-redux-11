export const ADD_SCORE = 'ADD_SCORE';

const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export default addScore;
