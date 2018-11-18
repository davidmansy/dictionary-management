import {
  RECEIVE_DICTIONARIES,
  ADD_DICTIONARY,
  DELETE_DICTIONARY,
  UPDATE_DOMAIN_RANGE,
  ADD_DOMAIN_RANGE
} from '../actions/dictionaries';
import transformer from '../utils/transformer';

function generateId() {
  return Math.random()
    .toString(36)
    .substr(-8);
}

export default function dictionaries(state = [], action) {
  switch (action.type) {
    case RECEIVE_DICTIONARIES:
      return state.concat(action.dictionaries);
    case ADD_DICTIONARY:
      return state.concat([action.newDictionary]);
    case DELETE_DICTIONARY:
      return state.filter(d => d.id !== action.id);
    case UPDATE_DOMAIN_RANGE:
      const data = transformer(action.data);
      const copyState = [...state];
      const index = copyState.findIndex(d => d.id === action.id);
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
    case ADD_DOMAIN_RANGE:
      const { domain, range } = action;
      const newState = [...state];
      const i = newState.findIndex(d => d.id === action.id);
      if (i > -1) {
        const dictionary = newState[i];
        dictionary.data.push({
          key: generateId(),
          domain,
          range,
          issues: new Set()
        });
        newState.splice(i, 1, {
          ...dictionary,
          data: [...transformer(dictionary.data)]
        });
        return newState;
      } else {
        console.warn('Error while adding a domain range');
        return state;
      }
    default:
      return state;
  }
}
