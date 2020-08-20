import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    let message = '';
    if (this.props.score < 3) {
      message = 'Podia ser melhor ...';
    } else if (this.props.score >= 3) {
      message = 'Mandou bem!';
    }
    return (message);
  }

  render() {
    return (
      <div>
        <header>
          <div data-testid="header-player-name">
            {localStorage.getItem('name')}
          </div>
          <div>
            <img
              data-testid="header-profile-picture"
              src={`https://www.gravatar.com/avatar/${localStorage.getItem('EmailMD5')}`}
              alt="player avatar"
            />
          </div>
        </header>
        <div data-testid="feedback-text">
          {this.feedbackMessage()}
        </div>
        <div data-testid="header-score">
          Score: {this.props.score}
        </div>
        <div>
          Correct Questions: {this.props.score}
        </div>
        <Link to="/">
          <button data-testid="btn-play-again">Jogar Novamente</button>
        </Link>
        <button data-testid="btn-ranking">Ver Ranking</button>
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
