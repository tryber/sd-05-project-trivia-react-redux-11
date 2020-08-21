import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import changePosition from '../action/changePosition';
import addScore from '../action/addScore';
import Timer from './Timer';

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

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: false,
      right: '',
      wrong: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.clickCorrect = this.clickCorrect.bind(this);
    this.clickIncorrect = this.clickIncorrect.bind(this);
    this.endTime = this.endTime.bind(this);
    this.buttonCorrect = this.buttonCorrect.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.endTime, 30000);
  }

  endTime() {
    this.setState({ button: true, right: 'right', wrong: 'wrong' });
  }

  handleClick() {
    const { questionPosition, questions, changePositions } = this.props;
    if (questionPosition < questions.length - 1) {
      changePositions();
    }
    this.setState({ button: false, right: '', wrong: '' });
  }

  clickCorrect() {
    const { addScores } = this.props;
    addScores(10);
    this.endTime();
  }

  clickIncorrect() {
    this.setState({ button: true, right: 'right', wrong: 'wrong' });
  }

  buttonCorrect(correctAnswer, index) {
    return (
      <button
        className={this.state.right} onClick={this.clickCorrect}
        disabled={this.state.button} data-testid="correct-answer"
        key={index}
      >
        {correctAnswer}
      </button>
    );
  }

  render() {
    const i = this.props.questionPosition;
    if (!this.props.questions) return <div> Carregando Perguntas ...</div>;
    const { type, category, question } = this.props.questions[i];
    const correctAnswer = this.props.questions[i].correct_answer;
    const incorrectAnswers = this.props.questions[i].incorrect_answers;
    const randomAnswer = shuffle(incorrectAnswers.concat(correctAnswer));
    let counter = -1;
    return (
      <div>
        <Timer />
        <div>{type}</div>
        <div data-testid="question-category">{category}</div>
        <div data-testid="question-text" >{question}</div>
        <div>
          {randomAnswer.map((answer, index) => {
            if (answer === correctAnswer) return this.buttonCorrect(answer, index);
            counter += 1;
            return (
              <button
                className={this.state.wrong} onClick={this.clickIncorrect}
                disabled={this.state.button} data-testid={`wrong-answer-${counter}`}
              >
                {answer}
              </button>);
          })}
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
  addScores: (score) => dispatch(addScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);

QuestionCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionPosition: PropTypes.number.isRequired,
  changePositions: PropTypes.func.isRequired,
  addScores: PropTypes.func.isRequired,
};
