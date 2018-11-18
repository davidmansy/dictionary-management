export function loadState() {
  try {
    const serializedState = localStorage.getItem('dictionaryManagementState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    //Sets are not serialized -> transformation to array
    //TODO: Heavy to do that each time, the use of the Set could be reevaluated
    state.dictionaries.forEach(d =>
      d.data.forEach(domRang => (domRang.issues = [...domRang.issues]))
    );
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dictionaryManagementState', serializedState);
  } catch {
    // ignore write errors
  }
}
