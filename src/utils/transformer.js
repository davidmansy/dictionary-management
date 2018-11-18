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

/*
  Using brute force here and getting quadratic time.
  TODO: Using a custom hashtable could avoid this quadratic time/complexity when
  looking e.g. for a dup where we should get constant time.
  Howver when looking for a cycle, in order to have a constant time, we would
  need another hashtable where the key is the range and not the domain.
 */

export const transformer = sourceData => {
  const data = [...sourceData];
  data.forEach(d => (d.issues = new Set())); //reset issues - linear time/comp

  for (let i = 0, l = data.length; i < l; i++) {
    const item1 = data[i];
    for (let j = i + 1; j < l; j++) {
      const item2 = data[j];
      //TODO: here a hashtable would mean access in constant time.
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
      //data structure each time the hastable is updated.
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
  }

  return data;
};
