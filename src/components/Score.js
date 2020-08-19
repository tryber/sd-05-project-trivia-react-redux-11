import React from 'react';
import { connect } from 'react-redux';

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        Score
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.token.isFetching,
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Score);
