import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import DictionaryList from './components/DictionaryList';
import Dictionary from './components/Dictionary';
import Loading from './components/Loading';
import NotFound from './components/NotFound';

function generateId() {
  return Math.random()
    .toString(36)
    .substr(-8);
}

// TODO: REMOVE
// const mockedDictionaries = [
//   {
//     title: 'Furniture dictionary',
//     id: generateId(),
//     status: 'inconsistent', //at least one warning
//     data: [
//       {
//         key: generateId(),
//         domain: 'Stonegrey',
//         range: 'Dark Grey',
//         issues: []
//       },
//       {
//         key: generateId(),
//         domain: 'Caribbean Sea',
//         range: 'Turqoise',
//         issues: [{ type: 'Duplicate Domains/Ranges', severity: 'warning' }]
//       },
//       {
//         key: generateId(),
//         domain: 'Caribbean Sea',
//         range: 'Turqoise',
//         issues: [{ type: 'Duplicate Domains/Ranges', severity: 'warning' }]
//       }
//     ]
//   },
//   {
//     title: 'TV Dictionary',
//     id: generateId(),
//     status: 'valid', //no errors, no warnings
//     data: [
//       {
//         key: generateId(),
//         domain: 'Caribbean Sea',
//         range: 'Turqoise',
//         issues: []
//       },
//       {
//         key: generateId(),
//         domain: 'Midnight Blue',
//         range: 'Dark Blue',
//         issues: []
//       }
//     ]
//   },
//   {
//     title: 'Computer Dictionary',
//     id: generateId(),
//     status: 'invalid', //Has at least one error
//     data: [
//       {
//         key: generateId(),
//         domain: 'Stonegrey',
//         range: 'Dark Grey',
//         issues: [{ type: 'cycle', severity: 'error' }]
//       },
//       {
//         key: generateId(),
//         domain: 'Dark Grey',
//         range: 'Stonegrey',
//         issues: [{ type: 'cycle', severity: 'error' }]
//       }
//     ]
//   }
// ];

const mockedDictionaries = [
  {
    title: 'Furniture dictionary',
    id: generateId(),
    status: 'inconsistent', //at least one warning
    data: [
      {
        key: generateId(),
        domain: 'Stonegrey',
        range: 'Dark Grey',
        issues: []
      },
      {
        key: generateId(),
        domain: 'Caribbean Sea',
        range: 'Turqoise',
        issues: []
      },
      {
        key: generateId(),
        domain: 'Caribbean Sea',
        range: 'Turqoise',
        issues: []
      }
    ]
  },
  {
    title: 'TV Dictionary',
    id: generateId(),
    status: 'valid', //no errors, no warnings
    data: [
      {
        key: generateId(),
        domain: 'Caribbean Sea',
        range: 'Turqoise',
        issues: []
      },
      {
        key: generateId(),
        domain: 'Midnight Blue',
        range: 'Dark Blue',
        issues: []
      }
    ]
  },
  {
    title: 'Computer Dictionary',
    id: generateId(),
    status: 'invalid', //Has at least one error
    data: [
      {
        key: generateId(),
        domain: 'Stonegrey',
        range: 'Dark Grey',
        issues: []
      },
      {
        key: generateId(),
        domain: 'Dark Grey',
        range: 'Stonegrey',
        issues: []
      }
    ]
  }
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
      dictionaries: currentState.dictionaries.concat([{ title, id, data: [] }])
    }));
  };

  handleUpdateDictionary = (id, data) => {
    this.setState(({ dictionaries }) => {
      const index = dictionaries.findIndex(item => id === item.id);
      if (index > -1) {
        const dictionary = dictionaries[index];
        dictionaries.splice(index, 1, {
          ...dictionary,
          ...data
        });
        return { dictionaries };
      }
    });
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
            {isLoading ? (
              <Loading />
            ) : (
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <DictionaryList
                      dictionaries={dictionaries}
                      deleteDictionary={this.handleDeleteDictionary}
                      addDictionary={this.handleAddDictionary}
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
                    return (
                      <Dictionary
                        dictionary={dictionary}
                        updateDictionary={this.handleUpdateDictionary}
                      />
                    );
                  }}
                />
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
