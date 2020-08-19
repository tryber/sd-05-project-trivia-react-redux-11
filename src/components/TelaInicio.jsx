import React from 'react';
import { connect } from 'react-redux';
// import MD5 from 'crypto-js/md5';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';

// import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
import { fetchToken } from '../action/fetchToken';
import { fetchQuestions } from '../action/fetchTriviaQuestions';

class TelaInicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
      nome: '',
      email: '',
      hash: '',
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
    console.log(token);
    getQuestions(token);
  }

  verify() {
    if (this.state.nome !== '' && this.state.email !== '') {
      this.setState({ button: false });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.verify();
    /* const hash = CryptoJS.MD5(this.state.email); */
    /* console.log(hash) */
    if (event.target.name === 'email') {
      this.converteToHash(this.state.hash);
    }
  }

  render() {
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
