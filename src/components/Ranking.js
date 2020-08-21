import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.redirectPage = this.redirectPage.bind(this);
  }

  redirectPage() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    // JSON.parse() converse uma string para um objeto JS, fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    if (this.state.redirect) return <Redirect to="/" />;
    const hash = localStorage.getItem('EmailMD5');
    return (
      <div>
        <header>
          Ranking
        </header>
        <img src={`https://www.gravatar.com/avatar/${hash}`} alt="Avatar" />
        <div>
          Nome: {state.player.name}
        </div>
        <div>
          Score: {state.player.score}
        </div>
        <button data-testid="btn-go-home" onClick={this.redirectPage}>
          Inicio
        </button>
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
