import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddDictionary from './AddDictionary';
import DictionaryListItem from './DictionaryListItem';

class DictionaryList extends Component {
  render() {
    const { dictionaryIds } = this.props;

    return (
      <div>
        <AddDictionary addDictionary />
        <ul>
          {dictionaryIds.map(id => {
            return (
              <li key={id} className="dictionary-list-item">
                <DictionaryListItem id={id} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStatesToProps({ dictionaries }) {
  return {
    dictionaryIds: dictionaries.map(d => d.id)
  };
}

export default connect(mapStatesToProps)(DictionaryList);
