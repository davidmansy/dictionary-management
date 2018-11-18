import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteDictionary } from '../actions/dictionaries';
import { withRouter } from 'react-router-dom';

class DictionaryListItem extends Component {
  goToDetail = e => {
    const { history, dictionary } = this.props;
    e.preventDefault();
    history.push(`/dictionaries/${dictionary.id}`);
  };

  handleDeleteDictionary = e => {
    e.preventDefault();
    const { dictionary, dispatch } = this.props;
    dispatch(deleteDictionary(dictionary.id));
  };

  render() {
    const { dictionary } = this.props;

    return (
      <Fragment>
        <div>
          <span>{dictionary.title}</span>
        </div>
        <div>
          <button className="dictionary-button" onClick={this.goToDetail}>
            Detail
          </button>
          <button
            className="dictionary-button"
            onClick={this.handleDeleteDictionary}
          >
            Delete
          </button>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ dictionaries }, { id }) {
  const dictionary = dictionaries.find(d => d.id === id);
  return {
    dictionary
  };
}

export default withRouter(connect(mapStateToProps)(DictionaryListItem));
