import {
  RECEIVE_DICTIONARIES,
  ADD_DICTIONARY,
  DELETE_DICTIONARY,
  UPDATE_DICTIONARY
} from '../actions/dictionaries';

export default function dictionaries(state = [], action) {
  switch (action.type) {
    case RECEIVE_DICTIONARIES:
      return state.concat(action.dictionaries);
    case ADD_DICTIONARY:
      return state.concat([action.newDictionary]);
    case DELETE_DICTIONARY:
      const newState = state.filter(d => d.id !== action.id);
      return newState;
    case UPDATE_DICTIONARY:
      const { id, data } = action;
      const copyState = [...state];
      const index = copyState.findIndex(d => d.id === id);
      if (index > -1) {
        const dictionary = copyState[index];
        copyState.splice(index, 1, {
          ...dictionary,
          data: [...data]
        });
        return copyState;
      } else {
        console.warn('Error while updating a dictionary');
        return state;
      }
    default:
      return state;
  }
}
