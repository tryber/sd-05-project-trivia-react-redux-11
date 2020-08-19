import {
  RECEIVE_QUESTIONS_FAILURE,
  RECEIVE_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS,
} from '../action/fetchTriviaQuestions';

const INITIAL_STATE = {
  isFetching: false,
  questions: {},
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_QUESTIONS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.questions,
        isFetching: false,
      };
    case RECEIVE_QUESTIONS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default questions;
