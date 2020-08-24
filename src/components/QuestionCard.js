import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import changePosition from '../action/changePosition';
import addScore from '../action/addScore';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: false,
      right: '',
      wrong: '',
      buttonNext: false,
      redirect: false,
      timer: 30,
    };
    this.handleClick = this.handleClick.bind(this);
    this.clickCorrect = this.clickCorrect.bind(this);
    this.clickIncorrect = this.clickIncorrect.bind(this);
    this.endTime = this.endTime.bind(this);
    this.buttonCorrect = this.buttonCorrect.bind(this);
    this.buttonNext = this.buttonNext.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.myInterval = setInterval(this.changeState, 1000);
    this.timer = setTimeout(this.endTime, 30000);
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.myInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  changeState() {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }));
  }

  endTime() {
    this.setState({ button: true, right: 'right', wrong: 'wrong', buttonNext: true });
  }

  handleClick() {
    const { questionPosition, questions, changePositions, player } = this.props;
    if (questionPosition < questions.length - 1) {
      changePositions();
    } else {
      this.setState({ redirect: true });
    }
    this.setState({ button: false, right: '', wrong: '', buttonNext: false });
    const { name, assertions, gravatarEmail, score } = player;
    const playerInfo = { player: { name, assertions, score, gravatarEmail } };
    localStorage.setItem('state', JSON.stringify(playerInfo));
    this.setState({ timer: 30 });
    this.myInterval = setInterval(this.changeState, 1000);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.endTime, 30000);
  }

  clickCorrect() {
    const { addScores, questions, questionPosition } = this.props;
    const difficulty = questions[questionPosition].difficulty;
    let level = 0;
    if (difficulty === 'hard') {
      level = 3;
    } else if (difficulty === 'medium') {
      level = 2;
    } else if (difficulty === 'easy') {
      level = 1;
    }
    const questionScore = (10 + (this.state.timer * level));
    addScores(questionScore);
    this.endTime();
    clearInterval(this.myInterval);
  }

  clickIncorrect() {
    this.setState({ button: true, right: 'right', wrong: 'wrong', buttonNext: true });
    clearInterval(this.myInterval);
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

  buttonNext() {
    return (
      <button data-testid="btn-next" onClick={this.handleClick}>Próximo</button>
    );
  }

  render() {
    if (this.state.redirect) return <Redirect to="./feedback" />;
    const i = this.props.questionPosition;
    if (!this.props.questions) return <div> Carregando Perguntas ...</div>;
    let counter = -1;
    const correctAnswer = this.props.questions[i].correct_answer;
    return (
      <div>
        <div>
         Tempo:{this.state.timer}
        </div>
        <div data-testid="question-category">{this.props.questions[i].category}</div>
        <div data-testid="question-text" >{this.props.questions[i].question}</div>
        <div>
          {this.props.randomAnswer.map((answer, index) => {
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
        {this.state.buttonNext && this.buttonNext()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.token.isFetching,
  questions: state.questions.questions.results,
  questionPosition: state.questions.questionPosition,
  player: state.player,
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
  randomAnswer: PropTypes.arrayOf(PropTypes.string).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    hash: PropTypes.string,
    score: PropTypes.number,
    assertions: PropTypes.number,
    gravatarEmail: PropTypes.string,
    logged: PropTypes.bool,
  }).isRequired,
};
