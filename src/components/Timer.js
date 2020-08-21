import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 30,
    };
  }

  componentDidMount() {
    if (this.state.count > 0) {
      this.myInterval = setInterval(() => {
        this.setState((prevState) => ({ count: prevState.count - 1 }));
      }, 1000);
    }
  }

  componentDidUpdate() {
    if (this.state.count === 0) {
      clearInterval(this.myInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    return (
      <div>
        Tempo:{this.state.count}
      </div>
    );
  }
}

export default Timer;
