import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDictionary } from '../actions/dictionaries';

class AddDictionary extends Component {
  state = {
    title: ''
  };

  handleChange = e => {
    const title = e.target.value;
    this.setState(currentState => ({
      title
    }));
  };

  handleSubmitAddDictionary = e => {
    e.preventDefault();
    this.props.dispatch(addDictionary(this.state.title));
    this.setState(currentState => ({
      title: ''
    }));
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmitAddDictionary}
        className="add-dictionary-form"
      >
        <input
          type="text"
          className="add-dictionary-input-text"
          placeholder={'Add a dictionary'}
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button className="dictionary-button" type="submit">
          Add
        </button>
      </form>
    );
  }
}

export default connect()(AddDictionary);
