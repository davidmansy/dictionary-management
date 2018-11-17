import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditableTable from './EditableTable';

class Dictionary extends Component {
  render() {
    const { dictionary } = this.props;

    return (
      <div>
        {!dictionary ? null : (
          <Fragment>
            <Link to={'/'}>Back</Link>
            <h2>{dictionary.title}</h2>
            <EditableTable id={dictionary.id} />
          </Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps({ dictionaries }, { match }) {
  const dictionary = dictionaries.find(d => d.id === match.params.id);
  return {
    dictionary
  };
}

export default connect(mapStateToProps)(Dictionary);
