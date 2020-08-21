import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';
import { fetchQuestions } from '../action/fetchTriviaQuestions';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionPosition: 0,
    };
  }

  componentDidMount() {
    const { token, getQuestions, player } = this.props;
    getQuestions(token);
    const {name, assertions, gravatarEmail, score } = player;
    const playerInfo = { name, assertions, score, gravatarEmail };
    localStorage.setItem('player', JSON.stringify(playerInfo));
  }

  render() {
    const { score } = this.props;
    return (
      <div>
        <div data-testid="header-score">Score:{score}</div>
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${localStorage.getItem('EmailMD5')}`} alt="avatar"
        />
        <div data-testid="header-player-name">{localStorage.getItem('name')}</div>
        <QuestionCard />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.token.isFetching,
  questions: state.questions.questions,
  score: state.player.score,
  token: state.token.token.token,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  score: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    hash: PropTypes.string,
    score: PropTypes.number,
    assertions: PropTypes.number,
    gravatarEmail: PropTypes.string,
    logged: PropTypes.bool,
  }).isRequired,
};

Questions.defaultProps = {
  token: '',
};
