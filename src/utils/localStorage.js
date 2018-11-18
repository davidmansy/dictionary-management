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
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dictionaryManagementState', serializedState);
  } catch {
    // ignore write errors
  }
}
