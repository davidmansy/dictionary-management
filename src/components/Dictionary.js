import React, { Component, Fragment } from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import EditableTable from './EditableTable';

class Dictionary extends Component {
  render() {
    const { dictionary, updateDictionary } = this.props;

    return (
      <div>
        {/* TODO BUG: When refreshing the dico detail page, component did mount in app.js 
        is not called and so dictionaries are undefined and this dictionary is always 
        undefined, probably my bad use of react router v4 */}
        {!dictionary ? (
          <Loading />
        ) : (
          <Fragment>
            <Link to={'/'}>Back</Link>
            <h2>{dictionary.title}</h2>
            <EditableTable
              dictionary={dictionary}
              updateDictionary={updateDictionary}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Dictionary;
