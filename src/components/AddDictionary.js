import React, { Component } from 'react';

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
    this.props.addDictionary(this.state.title);
    this.setState(currentState => ({
      title: ''
    }));
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmitAddDictionary}
        className="addDictionary__form"
      >
        <input
          type="text"
          className="addDictionary__inputText"
          placeholder={'Add a dictionary'}
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button className="button__list" type="submit">
          Add
        </button>
      </form>
    );
  }
}

export default AddDictionary;
