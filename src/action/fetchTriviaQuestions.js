import getTriviaAPI from '../services/getTriviaAPI';

export const RECEIVE_QUESTIONS_FAILURE = 'RECEIVE_QUESTIONS_FAILURE';
export const RECEIVE_QUESTIONS_SUCCESS = 'RECEIVE_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';


const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const receiveQuestionsFailure = (error) => ({
  type: RECEIVE_QUESTIONS_FAILURE,
  error,
});

const receiveQuestionsSuccess = (questions) => ({
  type: RECEIVE_QUESTIONS_SUCCESS,
  questions,
});

export function fetchQuestions(token) {
  return (dispatch) => {
    dispatch(requestQuestions());
    return getTriviaAPI(token)
      .then(
        (questions) => dispatch(receiveQuestionsSuccess(questions)),
        (error) => dispatch(receiveQuestionsFailure(error.message)),
      );
  };
}
