import React, { Component } from 'react';
import Loading from './Loading';
import DictionaryListItem from './DictionaryListItem';

class DictionaryList extends Component {
  render() {
    const { dictionaries, isLoading, deleteDictionary } = this.props;

    return (
      <div>
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
