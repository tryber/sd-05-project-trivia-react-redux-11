import React from 'react';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
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
});

export default connect(mapStateToProps)(Questions);
