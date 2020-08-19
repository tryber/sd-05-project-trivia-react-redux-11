import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';


import { fetchToken } from '../action/fetchToken';
import { fetchQuestions } from '../action/fetchTriviaQuestions';

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
    };
    this.verify = this.verify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.converteToHash = this.converteToHash.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getToken } = this.props;
    getToken();
  }

  converteToHash(email) {
    this.setState({
      hash: CryptoJS.MD5(email),
    });
  }

  handleClick() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
    this.setState({
      redirect: true,
    })
  }

  verify() {
    if (this.state.nome !== '' && regexEmail.test(this.state.email) === true) {
      this.setState({ button: false });
    } else {
      this.setState({
        button: true,
      })
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

  render() {
    if (this.state.redirect) return <Redirect to="/questions" />;
    return (
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          data-testid="input-player-name"
          onChange={this.handleChange} name="nome"
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          data-testid="input-gravatar-email"
          onChange={this.handleChange} name="email"
        />
        <button data-testid="btn-play" disabled={this.state.button} onClick={this.handleClick}>
          Jogar
        </button>
        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="foto" />
      </div>
    );
  }
}

TelaInicio.propTypes = {
  token: PropTypes.string,
  getToken: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
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
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaInicio);
