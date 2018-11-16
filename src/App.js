import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import DictionaryList from './components/DictionaryList';
import Dictionary from './components/Dictionary';
import NotFound from './components/NotFound';

const mockedDictionaries = [
  { title: 'Furniture dictionary', id: '1' },
  { title: 'TV Dictionary', id: '2' }
];

class App extends Component {
  state = {
    dictionaries: [],
    isLoading: false
  };

  getAllDictionaries = () => {
    this.setState({ isLoading: true }, () => {
      //TODO: Call fake API
      this.setState({
        dictionaries: mockedDictionaries,
        isLoading: false
      });
    });
  };

  handleDeleteDictionary = id => {
    this.setState(currentState => ({
      dictionaries: currentState.dictionaries.filter(d => d.id !== id)
    }));
  };

  componentDidMount() {
    this.getAllDictionaries();
  }

  render() {
    const { dictionaries, isLoading } = this.state;

    return (
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <DictionaryList
                    dictionaries={dictionaries}
                    deleteDictionary={this.handleDeleteDictionary}
                    isLoading={isLoading}
                  />
                )}
              />
              <Route
                path="/dictionaries/:id"
                exact
                render={({ match }) => {
                  const dictionary = dictionaries.find(
                    d => d.id === match.params.id
                  );
                  return <Dictionary dictionary={dictionary} />;
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
