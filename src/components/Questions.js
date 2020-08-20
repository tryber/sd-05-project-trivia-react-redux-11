import React from 'react';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionPosition: 0,
    };
  }

  render() {
    const { score } = this.props;
    return (
      <div>
        <div>Score:{score}</div>
        <img src={`https://www.gravatar.com/avatar/${localStorage.getItem('EmailMD5')}`} alt="avatar" />
        <div>{localStorage.getItem('name')}</div>
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
});

export default connect(mapStateToProps)(Questions);
