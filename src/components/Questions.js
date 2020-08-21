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
    const { token, getQuestions } = this.props;
    getQuestions(token);
  }

  render() {
    const { score } = this.props;
    return (
      <div>
        <div data-testid="header-profile-picture">Score:{score}</div>
        <img
          data-testid="header-score"
          src={`https://www.gravatar.com/avatar/${localStorage.getItem('EmailMD5')}`} alt="avatar"
        />
        <div data-testid="header-player-name">{localStorage.getItem('name')}</div>
        Question:
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
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  score: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

Questions.defaultProps = {
  token: '',
};
