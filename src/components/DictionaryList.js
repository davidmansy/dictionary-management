import React, { Component } from 'react';
import AddDictionary from './AddDictionary';
import DictionaryListItem from './DictionaryListItem';

class DictionaryList extends Component {
  render() {
    const { dictionaries, deleteDictionary, addDictionary } = this.props;

    return (
      <div>
        <AddDictionary addDictionary={addDictionary} />
        <ul>
          {dictionaries.map(dictionary => {
            return (
              <li key={dictionary.id} className="dictionary-list-item">
                <DictionaryListItem
                  dictionary={dictionary}
                  deleteDictionary={deleteDictionary}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default DictionaryList;
