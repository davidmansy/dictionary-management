import React, { Component } from 'react';
import Loading from './Loading';
import AddDictionary from './AddDictionary';
import DictionaryListItem from './DictionaryListItem';

class DictionaryList extends Component {
  render() {
    const {
      dictionaries,
      isLoading,
      deleteDictionary,
      addDictionary
    } = this.props;

    return (
      <div>
        <AddDictionary addDictionary={addDictionary} />
        {isLoading ? (
          <Loading />
        ) : (
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
        )}
      </div>
    );
  }
}

export default DictionaryList;
