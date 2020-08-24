import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

// function rankingCard() {
  // if (localStorage.getItem('state') === null) {
  //   return (
  //   <div>Ainda não existe pontuações disponíveis!</div>
  //   )
  // }
  // const jogador = localStorage.getItem('state');
  // if (localStorage.getItem('players') === null) localStorage.setItem()
// }

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
    // const state = JSON.parse(localStorage.getItem('state'));
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking = ranking.sort((a, b) => b.score - a.score);
    // JSON.parse() converse uma string para um objeto JS, fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    if (this.state.redirect) return <Redirect to="/" />;
    const hash = localStorage.getItem('EmailMD5');
    return (
      <div>
        <header data-testid="ranking-title">Ranking</header>
        {ranking.map((player, index) => (
          <div>
            <img src={`https://www.gravatar.com/avatar/${hash}`} alt="Avatar" />
            <div>Nome: <span data-testid={`player-name-${index}`}>{player.name}</span></div>
            <div>Score: <span data-testid={`player-score-${index}`}>{player.score}</span></div>
          </div>
        ))}
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

const mapDispatchToProps = () => ({});

Ranking.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
