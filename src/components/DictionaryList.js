import React, { Component } from 'react';

class DictionaryList extends Component {
  render() {
    const { dictionaries } = this.props;

    return (
      <div>
        <div className="main">
          <ul>
            {dictionaries.map(dictionary => {
              return <li key={dictionary.id}>{dictionary.title}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default DictionaryList;
