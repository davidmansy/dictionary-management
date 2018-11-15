import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import DictionaryList from './components/DictionaryList';
import Dictionary from './components/Dictionary';
import NotFound from './components/NotFound';

class App extends Component {
  state = {
    dictionaries: []
  };

  getAllDictionaries = () => {
    this.setState({ isLoading: true }, () => {
      //TODO: Call fake API + loading spinner
      this.setState({
        dictionaries: [
          { title: 'Furniture dictionary', id: '1' },
          { title: 'TV Dictionary', id: '2' }
        ]
      });
    });
  };

  componentDidMount() {
    this.getAllDictionaries();
  }

  render() {
    const { dictionaries } = this.state;

    return (
      <Router>
        <Fragment>
          <Header title={'Dictionary Management'} />
          <div className="app">
            <Switch>
              <Route
                path="/"
                exact
                render={() => <DictionaryList dictionaries={dictionaries} />}
              />
              <Route
                path="/dictionary/:id"
                exact
                render={({ match }) => {
                  const dico = dictionaries.find(d => d.id === match.params.id);
                  return <Dictionary dictionary={dico} />;
                }}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
