export const RECEIVE_DICTIONARIES = 'RECEIVE_DICTIONARIES';

export function receiveDictionaries(dictionaries) {
  return {
    type: RECEIVE_DICTIONARIES,
    dictionaries
  };
}
