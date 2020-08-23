import {
  RECEIVE_QUESTIONS_FAILURE,
  RECEIVE_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS,
} from '../action/fetchTriviaQuestions';

import { CHANGE_QUESTION_POSITION } from '../action/changePosition';

const INITIAL_STATE = {
  isFetching: false,
  questions: {},
  questionPosition: 0,
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
        questionPosition: 0,
      };
    case RECEIVE_QUESTIONS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case CHANGE_QUESTION_POSITION:
      return {
        ...state,
        questionPosition: state.questionPosition + 1,
      };
    default:
      return state;
  }
};

export default questions;
