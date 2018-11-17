import { UPDATE_DICTIONARY } from '../actions/dictionaries';

const ISSUE_SEVERITY_WARNING = 'warning';
const ISSUE_SEVERITY_ERROR = 'error';

const DUPS_DOMAINS_RANGES = {
  type: 'Dups Domains Ranges',
  severity: ISSUE_SEVERITY_WARNING
};
const FORKS = {
  type: 'Forks',
  severity: ISSUE_SEVERITY_WARNING
};
const CHAINS = { type: 'Chains', severity: ISSUE_SEVERITY_WARNING };
const CYCLE = { type: 'Cycle', severity: ISSUE_SEVERITY_ERROR };

const validator = store => next => action => {
  if (action.type === UPDATE_DICTIONARY) {
    //Reset issues - linear complexity
    action.data.forEach(d => (d.issues = new Set()));
    //TODO: Using a hashtable would avoid this quadratic time/complexity
    for (let i = 0, l = action.data.length; i < l; i++) {
      const item1 = action.data[i];
      for (let j = i + 1; j < l; j++) {
        const item2 = action.data[j];
        //TODO: here a hashtable would mean access in constant time
        if (item1.domain === item2.domain) {
          if (item1.range === item2.range) {
            item1.issues.add(DUPS_DOMAINS_RANGES);
            item2.issues.add(DUPS_DOMAINS_RANGES);
          } else {
            item1.issues.add(FORKS);
            item2.issues.add(FORKS);
          }
        }
        //TODO: If we want constant time here, we would need to create a second
        //data structure where the key would be the range and update this
        //data structure each time the hastable is updated,
        if (item1.range === item2.domain) {
          if (item2.range === item1.domain) {
            item1.issues.add(CYCLE);
            item2.issues.add(CYCLE);
          } else {
            item1.issues.add(CHAINS);
            item2.issues.add(CHAINS);
          }
        }
      }

      //TODO: create another middleware for this but then another parsing...
      if (item1.issues) {
        item1.displayIssues = [...item1.issues].reduce((acc, issue) => {
          return issue.severity === 'warning'
            ? acc + `${issue.type} (W) `
            : acc + `${issue.type} (E) `;
        }, '');
      }
    }
  }

  const returnValue = next(action);
  if (action.type === UPDATE_DICTIONARY)
    console.log('The new state after validation', store.getState());
  return returnValue;
};

export default validator;
