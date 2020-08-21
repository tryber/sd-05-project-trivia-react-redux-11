import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';

import { fetchToken } from '../action/fetchToken';
import loadPlayer from '../action/loadPlayer';

const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

class TelaInicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
      nome: '',
      email: '',
      hash: '',
      redirect: false,
      settings: false,
      rank: false,
    };
    this.verify = this.verify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.converteToHash = this.converteToHash.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.redirectSettings = this.redirectSettings.bind(this);
    this.redirectRank = this.redirectRank.bind(this);
  }

  redirectRank(){
    this.setState({
      rank: true,
    });
  }

  converteToHash(email) {
    this.setState({
      hash: CryptoJS.MD5(email),
    });
  }

  async handleClick() {
    const { token, getToken, savePlayer } = this.props;
    await getToken();
    localStorage.setItem('token', token);
    this.setState({ redirect: true });
    const { nome, hash, email } = this.state;
    await savePlayer(nome, hash, email);
  }

  verify() {
    if (this.state.nome !== '' && regexEmail.test(this.state.email) === true) {
      this.setState({ button: false });
      this.converteToHash(this.state.email);
    } else {
      this.setState({ button: true });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    localStorage.setItem('name', this.state.nome);
    const emailHash = CryptoJS.MD5(this.state.email);
    localStorage.setItem('EmailMD5', emailHash);
    this.verify();
    /* const hash = CryptoJS.MD5(this.state.email); */
    /* console.log(hash) */
    if (event.target.name === 'email') {
      this.converteToHash(this.state.hash);
    }
  }

  redirectSettings() {
    this.setState({ settings: true });
  }

  render() {
    if (this.state.redirect) return <Redirect to="/questions" />;
    if (this.state.settings) return <Redirect to="/settings" />;
    if (this.state.rank) return <Redirect to="/Ranking" />;
    return (
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome" data-testid="input-player-name" onChange={this.handleChange} name="nome"
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email" data-testid="input-gravatar-email" onChange={this.handleChange} name="email"
        />
        <button data-testid="btn-play" disabled={this.state.button} onClick={this.handleClick}>
          Jogar
        </button>
        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="foto" />
        <button data-testid="btn-settings" onClick={this.redirectSettings}>Settings</button>
        <button data-testid="ranking-title" onClick={this.redirectRank}>Ranking</button>
      </div>
    );
  }
}

TelaInicio.propTypes = {
  token: PropTypes.string,
  getToken: PropTypes.func.isRequired,
};

TelaInicio.defaultProps = {
  token: '',
};

const mapStateToProps = (state) => ({
  isFetching: state.token.isFetching,
  token: state.token.token.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  savePlayer: (name, picture, email) => dispatch(loadPlayer(name, picture, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaInicio);
