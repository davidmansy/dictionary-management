import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import DomainsRangesTable from './DomainsRangesTable';
import AddDomainRange from './AddDomainRange';
import { Divider } from 'antd';

class Dictionary extends Component {
  render() {
    const { dictionary } = this.props;

    return (
      <div>
        {!dictionary ? (
          <Redirect to="/" />
        ) : (
          <Fragment>
            <Link to={'/'}>Back</Link>
            <h2>{dictionary.title}</h2>
            <div className="add-form-container">
              <Divider orientation="left">Add a new domain/range</Divider>
              <AddDomainRange id={dictionary.key} />
            </div>
            <div>
              <Divider orientation="left">Domains/ranges</Divider>
              <DomainsRangesTable id={dictionary.key} />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps({ dictionaries }, { match }) {
  const dictionary = dictionaries.find(d => d.key === match.params.key);
  return {
    dictionary
  };
}

export default connect(mapStateToProps)(Dictionary);
