import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Dictionary from './components/Dictionary';
import NotFound from './components/NotFound';
import { receiveDictionaries } from './actions/dictionaries';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(receiveDictionaries());
  }

  render() {
    const { dictionaries } = this.props;

    return (
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            {!dictionaries ? null : (
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/dictionaries/:key" exact component={Dictionary} />
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStatesToProps({ dictionaries }) {
  return {
    dictionaries
  };
}

export default connect(mapStatesToProps)(App);
