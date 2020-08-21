import React from 'react';
import PropTypes from 'prop-types';
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
          Ranking
        </header>
        <img src={`https://www.gravatar.com/avatar/${hash}`} alt="Avatar" />
        <div>
          Nome: {localStorage.getItem('name')}
        </div>
        <div>
          Score: {this.props.score}
        </div>
        <Link to="/">
          <button data-testid="btn-go-home">Inicio</button>
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

Ranking.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
