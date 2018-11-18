export const RECEIVE_DICTIONARIES = 'RECEIVE_DICTIONARIES';
export const ADD_DICTIONARY = 'ADD_DICTIONARY';
export const DELETE_DICTIONARY = 'DELETE_DICTIONARY';
export const UPDATE_DOMAIN_RANGE = 'UPDATE_DOMAIN_RANGE';
export const ADD_DOMAIN_RANGE = 'ADD_DOMAIN_RANGE';

function generateId() {
  return Math.random()
    .toString(36)
    .substr(-8);
}

const mockedDictionaries = [
  {
    title: 'Furniture dictionary',
    id: generateId(),
    data: [
      {
        key: generateId(),
        domain: 'Stonegrey',
        range: 'Dark Grey'
      },
      {
        key: generateId(),
        domain: 'Caribbean Sea',
        range: 'Turqoise'
      },
      {
        key: generateId(),
        domain: 'Caribbean Sea',
        range: 'Turqoise'
      }
    ]
  },
  {
    title: 'TV Dictionary',
    id: generateId(),
    data: [
      {
        key: generateId(),
        domain: 'Caribbean Sea',
        range: 'Turqoise'
      },
      {
        key: generateId(),
        domain: 'Midnight Blue',
        range: 'Dark Blue'
      }
    ]
  },
  {
    title: 'Computer Dictionary',
    id: generateId(),
    data: [
      {
        key: generateId(),
        domain: 'Stoneyellow',
        range: 'Dark Yellow'
      },
      {
        key: generateId(),
        domain: 'Stoneyellow',
        range: 'Dark Yellow'
      },
      {
        key: generateId(),
        domain: 'Dark Yellow',
        range: 'Stoneyellow'
      }
    ]
  }
];

//TODO: Store dictionaries in local storage
export function receiveDictionaries(dictionaries = mockedDictionaries) {
  return {
    type: RECEIVE_DICTIONARIES,
    dictionaries
  };
}

export function addDictionary(title) {
  const newDictionary = { title, id: generateId(), data: [] };
  return {
    type: ADD_DICTIONARY,
    newDictionary
  };
}

export function deleteDictionary(id) {
  return {
    type: DELETE_DICTIONARY,
    id
  };
}

export function updateDomainRange(id, data) {
  return {
    type: UPDATE_DOMAIN_RANGE,
    id,
    data
  };
}

export function addDomainRange({ id, domain, range }) {
  return {
    type: ADD_DOMAIN_RANGE,
    id,
    domain,
    range
  };
}
