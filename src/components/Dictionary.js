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
            <div className="add-domain-range-container">
              <Divider orientation="left">Add a new domain/range</Divider>
              <AddDomainRange id={dictionary.id} />
            </div>
            <div>
              <Divider orientation="left">
                List of existing domains/ranges
              </Divider>
              <DomainsRangesTable id={dictionary.id} />
            </div>
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
