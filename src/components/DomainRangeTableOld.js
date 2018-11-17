import React, { Component } from 'react';

class DomainRangeTable extends Component {
  state = {
    data: this.props.dictionary.data
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Domain</th>
              <th>Range</th>
            </tr>
          </thead>
          <tbody>
            {!data
              ? null
              : Object.keys(data).map(domain => (
                  <tr key={domain}>
                    <td>{domain}</td>
                    <td>{data[domain]}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DomainRangeTable;
