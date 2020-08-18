import React from 'react';

class TelaInicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
      nome: '',
      email: '',
    };
    this.verify = this.verify.bind(this);
    this.setVerify = this.setVerify.bind(this);
  }

  setVerify(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.verify();
  }

  verify() {
    if (this.state.nome !== '' && this.state.email !== '') {
      this.setState({ button: false });
    }
  }

  render() {
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
      </div>
    );
  }
}

export default TelaInicio;
