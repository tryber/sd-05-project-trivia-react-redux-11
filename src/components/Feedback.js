import React from 'react';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 4,
      score: 4,
      correctQuestions: 0,
    };
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    let message = '';
    if (this.state.score < 3) {
      message = 'Podia ser melhor ...';
    } else if (this.state.score >= 3) {
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
          Score: {this.state.score}
        </div>
        <div>
          Correct Questions: {this.state.correctQuestions}
        </div>
        <Link to="/">
          <button data-testid="btn-play-again">Play Again!</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
