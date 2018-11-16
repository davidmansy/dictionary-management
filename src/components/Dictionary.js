import React, { Component, Fragment } from 'react';
import Loading from './Loading';

class Dictionary extends Component {
  render() {
    const { dictionary } = this.props;

    return (
      <div>
        {!dictionary ? (
          <Loading />
        ) : (
          <Fragment>
            <p>Single dictionary</p>
            <p>Dictionary id: {dictionary.id}</p>
            <p>Dictionary title: {dictionary.title}</p>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Dictionary;
