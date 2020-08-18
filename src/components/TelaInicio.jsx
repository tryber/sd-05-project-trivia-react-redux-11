import React from 'react';
// import MD5 from 'crypto-js/md5';
import CryptoJS from 'crypto-js';

// import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';


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
    this.setVerify = this.setVerify.bind(this);
    this.converteToHash = this.converteToHash.bind(this);
  }

  setVerify(event) {
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

  verify() {
    if (this.state.nome !== '' && this.state.email !== '') {
      this.setState({ button: false });
    }
  }

  converteToHash(email) {
    this.setState({
      hash: CryptoJS.MD5(email),
    });
  }

  render() {
    console.log(CryptoJS.MD5('teste'));
    return (
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          data-testid="input-player-name"
          onChange={this.setVerify} name="nome"
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          data-testid="input-gravatar-email"
          onChange={this.setVerify} name="email"
        />
        <button data-testid="btn-play" disabled={this.state.button}>
          Jogar
        </button>
        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="foto" />
      </div>
    );
  }
}

export default TelaInicio;
