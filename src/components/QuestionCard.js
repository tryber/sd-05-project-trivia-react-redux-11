import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import changePosition from '../action/changePosition';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { questionPosition, questions, changePositions } = this.props;
    if (questionPosition < questions.length - 1) {
      changePositions();
    }
  }

  render() {
    const i = this.props.questionPosition;
    console.log(this.props);
    if (!this.props.questions) return <div> Carregando Perguntas ...</div>;
    const { type, category, question } = this.props.questions[i];
    const correctAnswer = this.props.questions[i].correct_answer;
    const incorrectAnswers = this.props.questions[i].incorrect_answers;
    return (
      <div>
        <div>{type}</div>
        <div data-testid="question-category">{category}</div>
        <div data-testid="question-test" >{question}</div>
        <div>
          <button data-testid="correct-answer">{correctAnswer}</button>
          {incorrectAnswers.map((answer, index) =>
            <button data-testid={`wrong-answer-${index}`}>{answer}</button>,
          )}
        </div>
        <button data-testid="btn-next" onClick={this.handleClick}>Próximo</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.token.isFetching,
  questions: state.questions.questions.results,
  questionPosition: state.questions.questionPosition,
});

const mapDispatchToProps = (dispatch) => ({
  changePositions: () => dispatch(changePosition()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);

QuestionCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionPosition: PropTypes.number.isRequired,
  changePositions: PropTypes.func.isRequired,
};
