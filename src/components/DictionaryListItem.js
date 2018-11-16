import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class DictionaryListItem extends Component {
  editDictionary = e => {
    const { history, dictionary } = this.props;
    e.preventDefault();
    history.push(`/dictionaries/${dictionary.id}`);
  };

  render() {
    const { dictionary, deleteDictionary } = this.props;

    return (
      <Fragment>
        <div>
          <span>{dictionary.title}</span>
        </div>
        <div>
          <button className="button__list" onClick={this.editDictionary}>
            Edit
          </button>
          <button
            className="button__list"
            onClick={e => {
              e.preventDefault();
              deleteDictionary(dictionary.id);
            }}
          >
            Delete
          </button>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(DictionaryListItem);
