import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import DictionaryList from './components/DictionaryList';
import Dictionary from './components/Dictionary';
import NotFound from './components/NotFound';

function generateId() {
  return Math.random()
    .toString(36)
    .substr(-8);
}

const mockedDictionaries = [
  { title: 'Furniture dictionary', id: generateId() },
  { title: 'TV Dictionary', id: generateId() }
];

//TODO: Store dictionaries in local storage
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

  handleAddDictionary = title => {
    //TODO: remove local fake id and call API
    const id = generateId();
    this.setState(currentState => ({
      dictionaries: currentState.dictionaries.concat([{ title, id }])
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
                    addDictionary={this.handleAddDictionary}
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
