import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        Ranking
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.token.isFetching,
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
