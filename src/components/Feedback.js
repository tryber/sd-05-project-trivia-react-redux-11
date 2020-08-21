import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function feedbackMessage() {
  const state = JSON.parse(localStorage.getItem('state'));
  // JSON.parse() converse uma string para um objeto JS, fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
  let message = '';
  if (state.player.assertions < 3) {
    message = 'Podia ser melhor...';
  } else if (state.player.assertions >= 3) {
    message = 'Mandou bem!';
  }
  return <div data-testid="feedback-text">{message}</div>;
}

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectInicio: false,
      redirectRanking: false,
    };
    this.redirectInicio = this.redirectInicio.bind(this);
    this.redirectRanking = this.redirectRanking.bind(this);
  }

  redirectRanking() {
    this.setState({ redirectRanking: true });
  }

  redirectInicio() {
    this.setState({ redirectInicio: true });
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    // JSON.parse() converse uma string para um objeto JS,
    // fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    if (this.state.redirectInicio) return <Redirect to="/" />;
    else if (this.state.redirectRanking) return <Redirect to="/Ranking" />;
    return (
      <div>
        <header>
          <div data-testid="header-score">{state.player.score}</div>
          {feedbackMessage()}
          <div data-testid="header-player-name">{state.player.name}</div>
          <div data-testid="feedback-total-score">Score: {state.player.score}</div>
          <div data-testid="feedback-total-question">Assertions: {state.player.assertions}</div>
          <div>
            <img
              data-testid="header-profile-picture"
              src={`https://www.gravatar.com/avatar/${localStorage.getItem(
                'EmailMD5',
              )}`}
              alt="player avatar"
            />
          </div>
        </header>
        <button data-testid="btn-play-again" onClick={this.redirectInicio}>
          Jogar Novamente
        </button>
        <button data-testid="btn-ranking" onClick={this.redirectRanking}>
          Ver Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
