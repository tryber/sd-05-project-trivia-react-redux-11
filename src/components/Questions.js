import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';
import { fetchQuestions } from '../action/fetchTriviaQuestions';

// FUNÇÃO shuffle retirada da intenet. Ela serve para sortear a ordem das respostas das questões
// Referência: https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  // this.setState({ array });
  const arrayAnswers = array;
  let m = arrayAnswers.length;
  let t;
  let i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    m -= 1;
    i = Math.floor(Math.random() * m);
    // And swap it with the current element.
    t = arrayAnswers[m];
    arrayAnswers[m] = arrayAnswers[i];
    arrayAnswers[i] = t;
  }
  return arrayAnswers;
}

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionPosition: 0,
    };
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
  }

  render() {
    const i = this.props.questionPosition;
    if (!this.props.questions) return <div> Carregando Perguntas ...</div>;
    const correctAnswer = this.props.questions[i].correct_answer;
    const incorrectAnswers = this.props.questions[i].incorrect_answers;
    const randomAnswer = shuffle(incorrectAnswers.concat(correctAnswer));
    const { score } = this.props;
    return (
      <div>
        <div>Score:<span data-testid="header-score">{score}</span></div>
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${localStorage.getItem('EmailMD5')}`} alt="avatar"
        />
        <div data-testid="header-player-name">{localStorage.getItem('name')}</div>
        <QuestionCard randomAnswer={randomAnswer} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.token.isFetching,
  questions: state.questions.questions.results,
  score: state.player.score,
  token: state.token.token.token,
  player: state.player,
  questionPosition: state.questions.questionPosition,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionPosition: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    hash: PropTypes.string,
    score: PropTypes.number,
    assertions: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};

Questions.defaultProps = {
  token: '',
};
