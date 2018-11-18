import {
  RECEIVE_DICTIONARIES,
  ADD_DICTIONARY,
  DELETE_DICTIONARY,
  UPDATE_DICTIONARY,
  UPDATE_DOMAIN_RANGE,
  ADD_DOMAIN_RANGE
} from '../actions/dictionaries';
import { transformer } from '../utils/transformer';

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
      return state.concat([
        {
          title: action.title,
          key: generateId(),
          data: []
        }
      ]);
    case DELETE_DICTIONARY:
      return state.filter(d => d.key !== action.key);
    case UPDATE_DICTIONARY:
      const { key, title } = action;
      const dubState = [...state];
      const index = dubState.findIndex(d => d.key === key);
      if (index > -1) {
        const dictionary = dubState[index];
        dubState.splice(index, 1, {
          ...dictionary,
          title
        });
        return dubState;
      } else {
        console.warn('Error while updating a dictionary');
        return state;
      }
    case UPDATE_DOMAIN_RANGE:
      const data = transformer(action.data);
      const copyState = [...state];
      const j = copyState.findIndex(d => d.key === action.key);
      if (j > -1) {
        const dictionary = copyState[j];
        copyState.splice(j, 1, {
          ...dictionary,
          data: [...data]
        });
        return copyState;
      } else {
        console.warn('Error while updating a domain range');
        return state;
      }
    case ADD_DOMAIN_RANGE:
      const { domain, range } = action;
      const newState = [...state];
      const i = newState.findIndex(d => d.key === action.key);
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
