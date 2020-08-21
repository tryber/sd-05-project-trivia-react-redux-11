import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const hash = localStorage.getItem('EmailMD5');
    return (
      <div>
        <header>
          Ranking:
        </header>
        <img src={`https://www.gravatar.com/avatar/${hash}`} alt="Avatar" />
        <div>
          {localStorage.getItem('name')}
        </div>
        <div>
          Score: {this.props.score}
        </div>
        <Link to="/">
          <button data-testid="btn-go-home">Início</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
