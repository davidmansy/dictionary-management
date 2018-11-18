export const RECEIVE_DICTIONARIES = 'RECEIVE_DICTIONARIES';
export const ADD_DICTIONARY = 'ADD_DICTIONARY';
export const DELETE_DICTIONARY = 'DELETE_DICTIONARY';
export const UPDATE_DICTIONARY = 'UPDATE_DICTIONARY';
export const UPDATE_DOMAIN_RANGE = 'UPDATE_DOMAIN_RANGE';
export const ADD_DOMAIN_RANGE = 'ADD_DOMAIN_RANGE';

export function receiveDictionaries(dictionaries = []) {
  return {
    type: RECEIVE_DICTIONARIES,
    dictionaries
  };
}

export function addDictionary(title) {
  return {
    type: ADD_DICTIONARY,
    title
  };
}

export function updateDictionary(key, title) {
  return {
    type: UPDATE_DICTIONARY,
    key,
    title
  };
}

export function deleteDictionary(key) {
  return {
    type: DELETE_DICTIONARY,
    key
  };
}

export function updateDomainRange(key, data) {
  return {
    type: UPDATE_DOMAIN_RANGE,
    key,
    data
  };
}

export function addDomainRange({ key, domain, range }) {
  return {
    type: ADD_DOMAIN_RANGE,
    key,
    domain,
    range
  };
}
