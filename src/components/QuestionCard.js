import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  render() {
    console.log(this.props);
    if (!this.props.questions) return <div> Carregando Perguntas ...</div>;
    const { type, category, question } = this.props.questions[0];
    return (
      <div>
        {type}
        {category}
        {question}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.token.isFetching,
  questions: state.questions.questions.results,
});

export default connect(mapStateToProps)(QuestionCard);

QuestionCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
